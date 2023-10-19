import { sys } from "cc";
import proto from "../../protobuf/proto.js";
// import { MessageType } from "@protobuf-ts/runtime";

// import * as fengsheng from "../../protobuf/fengsheng";
// import * as game from "../../protobuf/game";
// import * as card from "../../protobuf/card";
// import * as skill from "../../protobuf/skill";
// import { heart_toc } from "../../protobuf/fengsheng";

// const proto: { [index: string]: any } = {};

class ProtoHelper {
  static encode(protoName: string, data: Object) {
    const dataBuffer: Uint8Array = proto[protoName].encode(data);
    const length = protoName.length;
    const lengthBuffer = new Uint16Array(2);
    const buffer = new ArrayBuffer(length);
    const bufView = new Uint8Array(buffer);
    lengthBuffer[0] = length;
    for (let i = 0; i < length; i++) {
      bufView[i] = protoName.charCodeAt(i);
    }
    const protoBuffer = new Uint8Array(length + 2 + dataBuffer.length);
    protoBuffer.set(lengthBuffer);
    protoBuffer.set(new Uint8Array(buffer), 2);
    protoBuffer.set(dataBuffer, length + 2);
    return protoBuffer;
  }

  static decode(data: Blob | ArrayBuffer) {
    return new Promise((resolve, reject) => {
      try {
        if (sys.isNative) {
          const buffer = <ArrayBuffer>data;
          const bufView = new Uint8Array(buffer);
          const length = new Uint16Array(buffer.slice(0, 2))[0];
          let protoName = "";
          for (let i = 2; i < length + 2; i++) {
            protoName += String.fromCharCode(bufView[i]);
          }
          const dataBuffer = buffer.slice(length + 2);
          resolve({
            protoName,
            data: proto[protoName].fromBinary(new Uint8Array(dataBuffer)),
          });
        } else {
          const reader = new FileReader();
          reader.readAsArrayBuffer(<Blob>data);
          reader.onload = (e) => {
            const buffer = reader.result as ArrayBuffer;
            const bufView = new Uint8Array(buffer);
            const length = new Uint16Array(buffer.slice(0, 2))[0];
            let protoName = "";
            for (let i = 2; i < length + 2; i++) {
              protoName += String.fromCharCode(bufView[i]);
            }
            const dataBuffer = buffer.slice(length + 2);
            resolve({
              protoName,
              data: proto[protoName].decode(new Uint8Array(dataBuffer)),
            });
          };
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default ProtoHelper;

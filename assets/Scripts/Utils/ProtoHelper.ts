import proto from "../../Protobuf/proto.js";

class ProtoHelper {
  static encode(protoName: string, data: Object) {
    const dataBuffer: Uint8Array = proto[protoName].encode(data).finish();
    const length = protoName.length;
    const lengthBuffer = new Uint16Array(1);
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
    console.log(protoBuffer);
    return protoBuffer;
  }

  static decode(data: Blob) {
    return new Promise((reslove, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsArrayBuffer(data);
        reader.onload = (e) => {
          const buffer = reader.result as ArrayBuffer;
          const bufView = new Uint16Array(buffer);
          let protoName = "";
          const length = bufView[0];
          for (let i = 1; i <= length; i++) {
            protoName += String.fromCharCode(bufView[i]);
          }
          reslove({
            protoName,
            data: proto[protoName].decode(buffer.slice((length + 1) * 2)),
          });
        };
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default ProtoHelper;

// DO NOT EDIT! This is a generated file. Edit the JSDoc in src/*.js instead and run 'npm run build:types'.

/** role enum. */
export enum role {
    unknown = 0,
    wu_zhi_guo = 1,
    cheng_xiao_die = 2,
    lian_yuan = 3,
    mao_bu_ba = 4,
    zhang_yi_ting = 5,
    bai_cang_lang = 6,
    fei_yuan_long_chuan = 7,
    pei_ling = 8,
    huang_ji_ren = 9,
    wang_tian_xiang = 10,
    li_xing = 11,
    wang_kui = 12,
    a_fu_luo_la = 13,
    han_mei = 14,
    zheng_wen_xian = 15,
    xuan_qing_zi = 16,
    gui_jiao = 17,
    shao_xiu = 18,
    jin_sheng_huo = 19,
    gu_xiao_meng = 20,
    bai_fei_fei = 21,
    duan_mu_jing = 22,
    wang_fu_gui = 23,
    lao_han = 24,
    bai_xiao_nian = 25,
    lao_bie = 26,
    xiao_jiu = 27,
    li_ning_yu = 28,
    bai_kun_shan = 29,
    shang_yu = 30,
    sp_gu_xiao_meng = 1020,
    sp_li_ning_yu = 1028
}

/** phase enum. */
export enum phase {
    Draw_Phase = 0,
    Main_Phase = 1,
    Send_Start_Phase = 2,
    Send_Phase = 3,
    Fight_Phase = 4,
    Receive_Phase = 5
}

/** card_type enum. */
export enum card_type {
    Cheng_Qing = 0,
    Shi_Tan = 1,
    Wei_Bi = 2,
    Li_You = 3,
    Ping_Heng = 4,
    Po_Yi = 5,
    Jie_Huo = 6,
    Diao_Bao = 7,
    Wu_Dao = 8,
    Feng_Yun_Bian_Huan = 9
}

/** color enum. */
export enum color {
    Black = 0,
    Red = 1,
    Blue = 2,
    Has_No_Identity = 3
}

/** secret_task enum. */
export enum secret_task {
    Killer = 0,
    Stealer = 1,
    Collector = 2,
    Mutator = 3,
    Pioneer = 4
}

/** direction enum. */
export enum direction {
    Up = 0,
    Left = 1,
    Right = 2
}

/** Represents a card. */
export class card implements Icard {

    /**
     * Constructs a new card.
     * @param [properties] Properties to set
     */
    constructor(properties?: Icard);

    /** card cardId. */
    public cardId: number;

    /** card cardColor. */
    public cardColor: color[];

    /** card cardDir. */
    public cardDir: direction;

    /** card cardType. */
    public cardType: card_type;

    /** card whoDrawCard. */
    public whoDrawCard: color[];

    /** card canLock. */
    public canLock: boolean;

    /**
     * Creates a new card instance using the specified properties.
     * @param [properties] Properties to set
     * @returns card instance
     */
    public static create(properties?: Icard): card;

    /**
     * Encodes the specified card message. Does not implicitly {@link card.verify|verify} messages.
     * @param message card message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Icard, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified card message, length delimited. Does not implicitly {@link card.verify|verify} messages.
     * @param message card message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Icard, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a card message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns card
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): card;

    /**
     * Decodes a card message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns card
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): card;

    /**
     * Verifies a card message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a card message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns card
     */
    public static fromObject(object: { [k: string]: any }): card;

    /**
     * Creates a plain object from a card message. Also converts values to other types if specified.
     * @param message card
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: card, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this card to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for card
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an error_code_toc. */
export class error_code_toc implements Ierror_code_toc {

    /**
     * Constructs a new error_code_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ierror_code_toc);

    /** error_code_toc code. */
    public code: error_code;

    /** error_code_toc intParams. */
    public intParams: (number|Long)[];

    /** error_code_toc strParams. */
    public strParams: string[];

    /**
     * Creates a new error_code_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns error_code_toc instance
     */
    public static create(properties?: Ierror_code_toc): error_code_toc;

    /**
     * Encodes the specified error_code_toc message. Does not implicitly {@link error_code_toc.verify|verify} messages.
     * @param message error_code_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ierror_code_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified error_code_toc message, length delimited. Does not implicitly {@link error_code_toc.verify|verify} messages.
     * @param message error_code_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ierror_code_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an error_code_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns error_code_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): error_code_toc;

    /**
     * Decodes an error_code_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns error_code_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): error_code_toc;

    /**
     * Verifies an error_code_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an error_code_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns error_code_toc
     */
    public static fromObject(object: { [k: string]: any }): error_code_toc;

    /**
     * Creates a plain object from an error_code_toc message. Also converts values to other types if specified.
     * @param message error_code_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: error_code_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this error_code_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for error_code_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** error_code enum. */
export enum error_code {
    client_version_not_match = 0,
    no_more_room = 1,
    record_not_exists = 2,
    load_record_failed = 3,
    record_version_not_match = 4,
    name_too_long = 5,
    join_room_too_fast = 6,
    robot_not_allowed = 7,
    already_online = 8,
    no_color_message_card = 9,
    login_failed = 10
}

/** Represents a pause_record_tos. */
export class pause_record_tos implements Ipause_record_tos {

    /**
     * Constructs a new pause_record_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ipause_record_tos);

    /** pause_record_tos pause. */
    public pause: boolean;

    /**
     * Creates a new pause_record_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns pause_record_tos instance
     */
    public static create(properties?: Ipause_record_tos): pause_record_tos;

    /**
     * Encodes the specified pause_record_tos message. Does not implicitly {@link pause_record_tos.verify|verify} messages.
     * @param message pause_record_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ipause_record_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified pause_record_tos message, length delimited. Does not implicitly {@link pause_record_tos.verify|verify} messages.
     * @param message pause_record_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ipause_record_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a pause_record_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns pause_record_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pause_record_tos;

    /**
     * Decodes a pause_record_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns pause_record_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pause_record_tos;

    /**
     * Verifies a pause_record_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a pause_record_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns pause_record_tos
     */
    public static fromObject(object: { [k: string]: any }): pause_record_tos;

    /**
     * Creates a plain object from a pause_record_tos message. Also converts values to other types if specified.
     * @param message pause_record_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: pause_record_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this pause_record_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for pause_record_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a pause_record_toc. */
export class pause_record_toc implements Ipause_record_toc {

    /**
     * Constructs a new pause_record_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ipause_record_toc);

    /** pause_record_toc pause. */
    public pause: boolean;

    /**
     * Creates a new pause_record_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns pause_record_toc instance
     */
    public static create(properties?: Ipause_record_toc): pause_record_toc;

    /**
     * Encodes the specified pause_record_toc message. Does not implicitly {@link pause_record_toc.verify|verify} messages.
     * @param message pause_record_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ipause_record_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified pause_record_toc message, length delimited. Does not implicitly {@link pause_record_toc.verify|verify} messages.
     * @param message pause_record_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ipause_record_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a pause_record_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns pause_record_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pause_record_toc;

    /**
     * Decodes a pause_record_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns pause_record_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pause_record_toc;

    /**
     * Verifies a pause_record_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a pause_record_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns pause_record_toc
     */
    public static fromObject(object: { [k: string]: any }): pause_record_toc;

    /**
     * Creates a plain object from a pause_record_toc message. Also converts values to other types if specified.
     * @param message pause_record_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: pause_record_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this pause_record_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for pause_record_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a get_record_list_tos. */
export class get_record_list_tos implements Iget_record_list_tos {

    /**
     * Constructs a new get_record_list_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iget_record_list_tos);

    /** get_record_list_tos version. */
    public version: number;

    /**
     * Creates a new get_record_list_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns get_record_list_tos instance
     */
    public static create(properties?: Iget_record_list_tos): get_record_list_tos;

    /**
     * Encodes the specified get_record_list_tos message. Does not implicitly {@link get_record_list_tos.verify|verify} messages.
     * @param message get_record_list_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iget_record_list_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified get_record_list_tos message, length delimited. Does not implicitly {@link get_record_list_tos.verify|verify} messages.
     * @param message get_record_list_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iget_record_list_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a get_record_list_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns get_record_list_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): get_record_list_tos;

    /**
     * Decodes a get_record_list_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns get_record_list_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): get_record_list_tos;

    /**
     * Verifies a get_record_list_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a get_record_list_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns get_record_list_tos
     */
    public static fromObject(object: { [k: string]: any }): get_record_list_tos;

    /**
     * Creates a plain object from a get_record_list_tos message. Also converts values to other types if specified.
     * @param message get_record_list_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: get_record_list_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this get_record_list_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for get_record_list_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a get_record_list_toc. */
export class get_record_list_toc implements Iget_record_list_toc {

    /**
     * Constructs a new get_record_list_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iget_record_list_toc);

    /** get_record_list_toc records. */
    public records: string[];

    /**
     * Creates a new get_record_list_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns get_record_list_toc instance
     */
    public static create(properties?: Iget_record_list_toc): get_record_list_toc;

    /**
     * Encodes the specified get_record_list_toc message. Does not implicitly {@link get_record_list_toc.verify|verify} messages.
     * @param message get_record_list_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iget_record_list_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified get_record_list_toc message, length delimited. Does not implicitly {@link get_record_list_toc.verify|verify} messages.
     * @param message get_record_list_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iget_record_list_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a get_record_list_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns get_record_list_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): get_record_list_toc;

    /**
     * Decodes a get_record_list_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns get_record_list_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): get_record_list_toc;

    /**
     * Verifies a get_record_list_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a get_record_list_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns get_record_list_toc
     */
    public static fromObject(object: { [k: string]: any }): get_record_list_toc;

    /**
     * Creates a plain object from a get_record_list_toc message. Also converts values to other types if specified.
     * @param message get_record_list_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: get_record_list_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this get_record_list_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for get_record_list_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an add_order_tos. */
export class add_order_tos implements Iadd_order_tos {

    /**
     * Constructs a new add_order_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iadd_order_tos);

    /** add_order_tos time. */
    public time: number;

    /**
     * Creates a new add_order_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns add_order_tos instance
     */
    public static create(properties?: Iadd_order_tos): add_order_tos;

    /**
     * Encodes the specified add_order_tos message. Does not implicitly {@link add_order_tos.verify|verify} messages.
     * @param message add_order_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iadd_order_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified add_order_tos message, length delimited. Does not implicitly {@link add_order_tos.verify|verify} messages.
     * @param message add_order_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iadd_order_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an add_order_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns add_order_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): add_order_tos;

    /**
     * Decodes an add_order_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns add_order_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): add_order_tos;

    /**
     * Verifies an add_order_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an add_order_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns add_order_tos
     */
    public static fromObject(object: { [k: string]: any }): add_order_tos;

    /**
     * Creates a plain object from an add_order_tos message. Also converts values to other types if specified.
     * @param message add_order_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: add_order_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this add_order_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for add_order_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an add_order_toc. */
export class add_order_toc implements Iadd_order_toc {

    /**
     * Constructs a new add_order_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iadd_order_toc);

    /**
     * Creates a new add_order_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns add_order_toc instance
     */
    public static create(properties?: Iadd_order_toc): add_order_toc;

    /**
     * Encodes the specified add_order_toc message. Does not implicitly {@link add_order_toc.verify|verify} messages.
     * @param message add_order_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iadd_order_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified add_order_toc message, length delimited. Does not implicitly {@link add_order_toc.verify|verify} messages.
     * @param message add_order_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iadd_order_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an add_order_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns add_order_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): add_order_toc;

    /**
     * Decodes an add_order_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns add_order_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): add_order_toc;

    /**
     * Verifies an add_order_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an add_order_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns add_order_toc
     */
    public static fromObject(object: { [k: string]: any }): add_order_toc;

    /**
     * Creates a plain object from an add_order_toc message. Also converts values to other types if specified.
     * @param message add_order_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: add_order_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this add_order_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for add_order_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a pb_order. */
export class pb_order implements Ipb_order {

    /**
     * Constructs a new pb_order.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ipb_order);

    /** pb_order id. */
    public id: number;

    /** pb_order time. */
    public time: (number|Long);

    /** pb_order name. */
    public name: string;

    /** pb_order isMine. */
    public isMine: boolean;

    /**
     * Creates a new pb_order instance using the specified properties.
     * @param [properties] Properties to set
     * @returns pb_order instance
     */
    public static create(properties?: Ipb_order): pb_order;

    /**
     * Encodes the specified pb_order message. Does not implicitly {@link pb_order.verify|verify} messages.
     * @param message pb_order message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ipb_order, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified pb_order message, length delimited. Does not implicitly {@link pb_order.verify|verify} messages.
     * @param message pb_order message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ipb_order, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a pb_order message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns pb_order
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb_order;

    /**
     * Decodes a pb_order message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns pb_order
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb_order;

    /**
     * Verifies a pb_order message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a pb_order message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns pb_order
     */
    public static fromObject(object: { [k: string]: any }): pb_order;

    /**
     * Creates a plain object from a pb_order message. Also converts values to other types if specified.
     * @param message pb_order
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: pb_order, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this pb_order to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for pb_order
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a get_orders_tos. */
export class get_orders_tos implements Iget_orders_tos {

    /**
     * Constructs a new get_orders_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iget_orders_tos);

    /**
     * Creates a new get_orders_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns get_orders_tos instance
     */
    public static create(properties?: Iget_orders_tos): get_orders_tos;

    /**
     * Encodes the specified get_orders_tos message. Does not implicitly {@link get_orders_tos.verify|verify} messages.
     * @param message get_orders_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iget_orders_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified get_orders_tos message, length delimited. Does not implicitly {@link get_orders_tos.verify|verify} messages.
     * @param message get_orders_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iget_orders_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a get_orders_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns get_orders_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): get_orders_tos;

    /**
     * Decodes a get_orders_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns get_orders_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): get_orders_tos;

    /**
     * Verifies a get_orders_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a get_orders_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns get_orders_tos
     */
    public static fromObject(object: { [k: string]: any }): get_orders_tos;

    /**
     * Creates a plain object from a get_orders_tos message. Also converts values to other types if specified.
     * @param message get_orders_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: get_orders_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this get_orders_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for get_orders_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a get_orders_toc. */
export class get_orders_toc implements Iget_orders_toc {

    /**
     * Constructs a new get_orders_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iget_orders_toc);

    /** get_orders_toc orders. */
    public orders: Ipb_order[];

    /**
     * Creates a new get_orders_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns get_orders_toc instance
     */
    public static create(properties?: Iget_orders_toc): get_orders_toc;

    /**
     * Encodes the specified get_orders_toc message. Does not implicitly {@link get_orders_toc.verify|verify} messages.
     * @param message get_orders_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iget_orders_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified get_orders_toc message, length delimited. Does not implicitly {@link get_orders_toc.verify|verify} messages.
     * @param message get_orders_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iget_orders_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a get_orders_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns get_orders_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): get_orders_toc;

    /**
     * Decodes a get_orders_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns get_orders_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): get_orders_toc;

    /**
     * Verifies a get_orders_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a get_orders_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns get_orders_toc
     */
    public static fromObject(object: { [k: string]: any }): get_orders_toc;

    /**
     * Creates a plain object from a get_orders_toc message. Also converts values to other types if specified.
     * @param message get_orders_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: get_orders_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this get_orders_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for get_orders_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a heart_tos. */
export class heart_tos implements Iheart_tos {

    /**
     * Constructs a new heart_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iheart_tos);

    /**
     * Creates a new heart_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns heart_tos instance
     */
    public static create(properties?: Iheart_tos): heart_tos;

    /**
     * Encodes the specified heart_tos message. Does not implicitly {@link heart_tos.verify|verify} messages.
     * @param message heart_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iheart_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified heart_tos message, length delimited. Does not implicitly {@link heart_tos.verify|verify} messages.
     * @param message heart_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iheart_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a heart_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns heart_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): heart_tos;

    /**
     * Decodes a heart_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns heart_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): heart_tos;

    /**
     * Verifies a heart_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a heart_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns heart_tos
     */
    public static fromObject(object: { [k: string]: any }): heart_tos;

    /**
     * Creates a plain object from a heart_tos message. Also converts values to other types if specified.
     * @param message heart_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: heart_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this heart_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for heart_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a heart_toc. */
export class heart_toc implements Iheart_toc {

    /**
     * Constructs a new heart_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iheart_toc);

    /** heart_toc onlineCount. */
    public onlineCount: number;

    /**
     * Creates a new heart_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns heart_toc instance
     */
    public static create(properties?: Iheart_toc): heart_toc;

    /**
     * Encodes the specified heart_toc message. Does not implicitly {@link heart_toc.verify|verify} messages.
     * @param message heart_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iheart_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified heart_toc message, length delimited. Does not implicitly {@link heart_toc.verify|verify} messages.
     * @param message heart_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iheart_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a heart_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns heart_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): heart_toc;

    /**
     * Decodes a heart_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns heart_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): heart_toc;

    /**
     * Verifies a heart_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a heart_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns heart_toc
     */
    public static fromObject(object: { [k: string]: any }): heart_toc;

    /**
     * Creates a plain object from a heart_toc message. Also converts values to other types if specified.
     * @param message heart_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: heart_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this heart_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for heart_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an add_one_position_tos. */
export class add_one_position_tos implements Iadd_one_position_tos {

    /**
     * Constructs a new add_one_position_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iadd_one_position_tos);

    /**
     * Creates a new add_one_position_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns add_one_position_tos instance
     */
    public static create(properties?: Iadd_one_position_tos): add_one_position_tos;

    /**
     * Encodes the specified add_one_position_tos message. Does not implicitly {@link add_one_position_tos.verify|verify} messages.
     * @param message add_one_position_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iadd_one_position_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified add_one_position_tos message, length delimited. Does not implicitly {@link add_one_position_tos.verify|verify} messages.
     * @param message add_one_position_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iadd_one_position_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an add_one_position_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns add_one_position_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): add_one_position_tos;

    /**
     * Decodes an add_one_position_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns add_one_position_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): add_one_position_tos;

    /**
     * Verifies an add_one_position_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an add_one_position_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns add_one_position_tos
     */
    public static fromObject(object: { [k: string]: any }): add_one_position_tos;

    /**
     * Creates a plain object from an add_one_position_tos message. Also converts values to other types if specified.
     * @param message add_one_position_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: add_one_position_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this add_one_position_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for add_one_position_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an add_one_position_toc. */
export class add_one_position_toc implements Iadd_one_position_toc {

    /**
     * Constructs a new add_one_position_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iadd_one_position_toc);

    /**
     * Creates a new add_one_position_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns add_one_position_toc instance
     */
    public static create(properties?: Iadd_one_position_toc): add_one_position_toc;

    /**
     * Encodes the specified add_one_position_toc message. Does not implicitly {@link add_one_position_toc.verify|verify} messages.
     * @param message add_one_position_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iadd_one_position_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified add_one_position_toc message, length delimited. Does not implicitly {@link add_one_position_toc.verify|verify} messages.
     * @param message add_one_position_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iadd_one_position_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an add_one_position_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns add_one_position_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): add_one_position_toc;

    /**
     * Decodes an add_one_position_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns add_one_position_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): add_one_position_toc;

    /**
     * Verifies an add_one_position_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an add_one_position_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns add_one_position_toc
     */
    public static fromObject(object: { [k: string]: any }): add_one_position_toc;

    /**
     * Creates a plain object from an add_one_position_toc message. Also converts values to other types if specified.
     * @param message add_one_position_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: add_one_position_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this add_one_position_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for add_one_position_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a remove_one_position_tos. */
export class remove_one_position_tos implements Iremove_one_position_tos {

    /**
     * Constructs a new remove_one_position_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iremove_one_position_tos);

    /**
     * Creates a new remove_one_position_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns remove_one_position_tos instance
     */
    public static create(properties?: Iremove_one_position_tos): remove_one_position_tos;

    /**
     * Encodes the specified remove_one_position_tos message. Does not implicitly {@link remove_one_position_tos.verify|verify} messages.
     * @param message remove_one_position_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iremove_one_position_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified remove_one_position_tos message, length delimited. Does not implicitly {@link remove_one_position_tos.verify|verify} messages.
     * @param message remove_one_position_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iremove_one_position_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a remove_one_position_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns remove_one_position_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remove_one_position_tos;

    /**
     * Decodes a remove_one_position_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns remove_one_position_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remove_one_position_tos;

    /**
     * Verifies a remove_one_position_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a remove_one_position_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns remove_one_position_tos
     */
    public static fromObject(object: { [k: string]: any }): remove_one_position_tos;

    /**
     * Creates a plain object from a remove_one_position_tos message. Also converts values to other types if specified.
     * @param message remove_one_position_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: remove_one_position_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this remove_one_position_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for remove_one_position_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a remove_one_position_toc. */
export class remove_one_position_toc implements Iremove_one_position_toc {

    /**
     * Constructs a new remove_one_position_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iremove_one_position_toc);

    /** remove_one_position_toc position. */
    public position: number;

    /**
     * Creates a new remove_one_position_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns remove_one_position_toc instance
     */
    public static create(properties?: Iremove_one_position_toc): remove_one_position_toc;

    /**
     * Encodes the specified remove_one_position_toc message. Does not implicitly {@link remove_one_position_toc.verify|verify} messages.
     * @param message remove_one_position_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iremove_one_position_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified remove_one_position_toc message, length delimited. Does not implicitly {@link remove_one_position_toc.verify|verify} messages.
     * @param message remove_one_position_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iremove_one_position_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a remove_one_position_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns remove_one_position_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remove_one_position_toc;

    /**
     * Decodes a remove_one_position_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns remove_one_position_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remove_one_position_toc;

    /**
     * Verifies a remove_one_position_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a remove_one_position_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns remove_one_position_toc
     */
    public static fromObject(object: { [k: string]: any }): remove_one_position_toc;

    /**
     * Creates a plain object from a remove_one_position_toc message. Also converts values to other types if specified.
     * @param message remove_one_position_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: remove_one_position_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this remove_one_position_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for remove_one_position_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a display_record_tos. */
export class display_record_tos implements Idisplay_record_tos {

    /**
     * Constructs a new display_record_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Idisplay_record_tos);

    /** display_record_tos version. */
    public version: number;

    /** display_record_tos recordId. */
    public recordId: string;

    /**
     * Creates a new display_record_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns display_record_tos instance
     */
    public static create(properties?: Idisplay_record_tos): display_record_tos;

    /**
     * Encodes the specified display_record_tos message. Does not implicitly {@link display_record_tos.verify|verify} messages.
     * @param message display_record_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Idisplay_record_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified display_record_tos message, length delimited. Does not implicitly {@link display_record_tos.verify|verify} messages.
     * @param message display_record_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Idisplay_record_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a display_record_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns display_record_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): display_record_tos;

    /**
     * Decodes a display_record_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns display_record_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): display_record_tos;

    /**
     * Verifies a display_record_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a display_record_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns display_record_tos
     */
    public static fromObject(object: { [k: string]: any }): display_record_tos;

    /**
     * Creates a plain object from a display_record_tos message. Also converts values to other types if specified.
     * @param message display_record_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: display_record_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this display_record_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for display_record_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a display_record_end_toc. */
export class display_record_end_toc implements Idisplay_record_end_toc {

    /**
     * Constructs a new display_record_end_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Idisplay_record_end_toc);

    /**
     * Creates a new display_record_end_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns display_record_end_toc instance
     */
    public static create(properties?: Idisplay_record_end_toc): display_record_end_toc;

    /**
     * Encodes the specified display_record_end_toc message. Does not implicitly {@link display_record_end_toc.verify|verify} messages.
     * @param message display_record_end_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Idisplay_record_end_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified display_record_end_toc message, length delimited. Does not implicitly {@link display_record_end_toc.verify|verify} messages.
     * @param message display_record_end_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Idisplay_record_end_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a display_record_end_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns display_record_end_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): display_record_end_toc;

    /**
     * Decodes a display_record_end_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns display_record_end_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): display_record_end_toc;

    /**
     * Verifies a display_record_end_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a display_record_end_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns display_record_end_toc
     */
    public static fromObject(object: { [k: string]: any }): display_record_end_toc;

    /**
     * Creates a plain object from a display_record_end_toc message. Also converts values to other types if specified.
     * @param message display_record_end_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: display_record_end_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this display_record_end_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for display_record_end_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a save_record_success_toc. */
export class save_record_success_toc implements Isave_record_success_toc {

    /**
     * Constructs a new save_record_success_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Isave_record_success_toc);

    /** save_record_success_toc recordId. */
    public recordId: string;

    /**
     * Creates a new save_record_success_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns save_record_success_toc instance
     */
    public static create(properties?: Isave_record_success_toc): save_record_success_toc;

    /**
     * Encodes the specified save_record_success_toc message. Does not implicitly {@link save_record_success_toc.verify|verify} messages.
     * @param message save_record_success_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Isave_record_success_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified save_record_success_toc message, length delimited. Does not implicitly {@link save_record_success_toc.verify|verify} messages.
     * @param message save_record_success_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Isave_record_success_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a save_record_success_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns save_record_success_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): save_record_success_toc;

    /**
     * Decodes a save_record_success_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns save_record_success_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): save_record_success_toc;

    /**
     * Verifies a save_record_success_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a save_record_success_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns save_record_success_toc
     */
    public static fromObject(object: { [k: string]: any }): save_record_success_toc;

    /**
     * Creates a plain object from a save_record_success_toc message. Also converts values to other types if specified.
     * @param message save_record_success_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: save_record_success_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this save_record_success_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for save_record_success_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a join_room_tos. */
export class join_room_tos implements Ijoin_room_tos {

    /**
     * Constructs a new join_room_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ijoin_room_tos);

    /** join_room_tos version. */
    public version: number;

    /** join_room_tos name. */
    public name: string;

    /** join_room_tos device. */
    public device: string;

    /** join_room_tos password. */
    public password: string;

    /**
     * Creates a new join_room_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns join_room_tos instance
     */
    public static create(properties?: Ijoin_room_tos): join_room_tos;

    /**
     * Encodes the specified join_room_tos message. Does not implicitly {@link join_room_tos.verify|verify} messages.
     * @param message join_room_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ijoin_room_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified join_room_tos message, length delimited. Does not implicitly {@link join_room_tos.verify|verify} messages.
     * @param message join_room_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ijoin_room_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a join_room_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns join_room_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): join_room_tos;

    /**
     * Decodes a join_room_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns join_room_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): join_room_tos;

    /**
     * Verifies a join_room_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a join_room_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns join_room_tos
     */
    public static fromObject(object: { [k: string]: any }): join_room_tos;

    /**
     * Creates a plain object from a join_room_tos message. Also converts values to other types if specified.
     * @param message join_room_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: join_room_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this join_room_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for join_room_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a get_room_info_toc. */
export class get_room_info_toc implements Iget_room_info_toc {

    /**
     * Constructs a new get_room_info_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iget_room_info_toc);

    /** get_room_info_toc names. */
    public names: string[];

    /** get_room_info_toc myPosition. */
    public myPosition: number;

    /** get_room_info_toc onlineCount. */
    public onlineCount: number;

    /** get_room_info_toc winCounts. */
    public winCounts: number[];

    /**
     * Creates a new get_room_info_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns get_room_info_toc instance
     */
    public static create(properties?: Iget_room_info_toc): get_room_info_toc;

    /**
     * Encodes the specified get_room_info_toc message. Does not implicitly {@link get_room_info_toc.verify|verify} messages.
     * @param message get_room_info_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iget_room_info_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified get_room_info_toc message, length delimited. Does not implicitly {@link get_room_info_toc.verify|verify} messages.
     * @param message get_room_info_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iget_room_info_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a get_room_info_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns get_room_info_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): get_room_info_toc;

    /**
     * Decodes a get_room_info_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns get_room_info_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): get_room_info_toc;

    /**
     * Verifies a get_room_info_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a get_room_info_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns get_room_info_toc
     */
    public static fromObject(object: { [k: string]: any }): get_room_info_toc;

    /**
     * Creates a plain object from a get_room_info_toc message. Also converts values to other types if specified.
     * @param message get_room_info_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: get_room_info_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this get_room_info_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for get_room_info_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an add_robot_tos. */
export class add_robot_tos implements Iadd_robot_tos {

    /**
     * Constructs a new add_robot_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iadd_robot_tos);

    /**
     * Creates a new add_robot_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns add_robot_tos instance
     */
    public static create(properties?: Iadd_robot_tos): add_robot_tos;

    /**
     * Encodes the specified add_robot_tos message. Does not implicitly {@link add_robot_tos.verify|verify} messages.
     * @param message add_robot_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iadd_robot_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified add_robot_tos message, length delimited. Does not implicitly {@link add_robot_tos.verify|verify} messages.
     * @param message add_robot_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iadd_robot_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an add_robot_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns add_robot_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): add_robot_tos;

    /**
     * Decodes an add_robot_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns add_robot_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): add_robot_tos;

    /**
     * Verifies an add_robot_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an add_robot_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns add_robot_tos
     */
    public static fromObject(object: { [k: string]: any }): add_robot_tos;

    /**
     * Creates a plain object from an add_robot_tos message. Also converts values to other types if specified.
     * @param message add_robot_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: add_robot_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this add_robot_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for add_robot_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a remove_robot_tos. */
export class remove_robot_tos implements Iremove_robot_tos {

    /**
     * Constructs a new remove_robot_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iremove_robot_tos);

    /**
     * Creates a new remove_robot_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns remove_robot_tos instance
     */
    public static create(properties?: Iremove_robot_tos): remove_robot_tos;

    /**
     * Encodes the specified remove_robot_tos message. Does not implicitly {@link remove_robot_tos.verify|verify} messages.
     * @param message remove_robot_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iremove_robot_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified remove_robot_tos message, length delimited. Does not implicitly {@link remove_robot_tos.verify|verify} messages.
     * @param message remove_robot_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iremove_robot_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a remove_robot_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns remove_robot_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): remove_robot_tos;

    /**
     * Decodes a remove_robot_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns remove_robot_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): remove_robot_tos;

    /**
     * Verifies a remove_robot_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a remove_robot_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns remove_robot_tos
     */
    public static fromObject(object: { [k: string]: any }): remove_robot_tos;

    /**
     * Creates a plain object from a remove_robot_tos message. Also converts values to other types if specified.
     * @param message remove_robot_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: remove_robot_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this remove_robot_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for remove_robot_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a join_room_toc. */
export class join_room_toc implements Ijoin_room_toc {

    /**
     * Constructs a new join_room_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ijoin_room_toc);

    /** join_room_toc name. */
    public name: string;

    /** join_room_toc position. */
    public position: number;

    /** join_room_toc winCount. */
    public winCount: number;

    /** join_room_toc gameCount. */
    public gameCount: number;

    /**
     * Creates a new join_room_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns join_room_toc instance
     */
    public static create(properties?: Ijoin_room_toc): join_room_toc;

    /**
     * Encodes the specified join_room_toc message. Does not implicitly {@link join_room_toc.verify|verify} messages.
     * @param message join_room_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ijoin_room_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified join_room_toc message, length delimited. Does not implicitly {@link join_room_toc.verify|verify} messages.
     * @param message join_room_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ijoin_room_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a join_room_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns join_room_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): join_room_toc;

    /**
     * Decodes a join_room_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns join_room_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): join_room_toc;

    /**
     * Verifies a join_room_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a join_room_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns join_room_toc
     */
    public static fromObject(object: { [k: string]: any }): join_room_toc;

    /**
     * Creates a plain object from a join_room_toc message. Also converts values to other types if specified.
     * @param message join_room_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: join_room_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this join_room_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for join_room_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a leave_room_toc. */
export class leave_room_toc implements Ileave_room_toc {

    /**
     * Constructs a new leave_room_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ileave_room_toc);

    /** leave_room_toc position. */
    public position: number;

    /**
     * Creates a new leave_room_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns leave_room_toc instance
     */
    public static create(properties?: Ileave_room_toc): leave_room_toc;

    /**
     * Encodes the specified leave_room_toc message. Does not implicitly {@link leave_room_toc.verify|verify} messages.
     * @param message leave_room_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ileave_room_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified leave_room_toc message, length delimited. Does not implicitly {@link leave_room_toc.verify|verify} messages.
     * @param message leave_room_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ileave_room_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a leave_room_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns leave_room_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): leave_room_toc;

    /**
     * Decodes a leave_room_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns leave_room_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): leave_room_toc;

    /**
     * Verifies a leave_room_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a leave_room_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns leave_room_toc
     */
    public static fromObject(object: { [k: string]: any }): leave_room_toc;

    /**
     * Creates a plain object from a leave_room_toc message. Also converts values to other types if specified.
     * @param message leave_room_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: leave_room_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this leave_room_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for leave_room_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a wait_for_select_role_toc. */
export class wait_for_select_role_toc implements Iwait_for_select_role_toc {

    /**
     * Constructs a new wait_for_select_role_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iwait_for_select_role_toc);

    /** wait_for_select_role_toc playerCount. */
    public playerCount: number;

    /** wait_for_select_role_toc identity. */
    public identity: color;

    /** wait_for_select_role_toc secretTask. */
    public secretTask: secret_task;

    /** wait_for_select_role_toc roles. */
    public roles: role[];

    /** wait_for_select_role_toc waitingSecond. */
    public waitingSecond: number;

    /**
     * Creates a new wait_for_select_role_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns wait_for_select_role_toc instance
     */
    public static create(properties?: Iwait_for_select_role_toc): wait_for_select_role_toc;

    /**
     * Encodes the specified wait_for_select_role_toc message. Does not implicitly {@link wait_for_select_role_toc.verify|verify} messages.
     * @param message wait_for_select_role_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iwait_for_select_role_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified wait_for_select_role_toc message, length delimited. Does not implicitly {@link wait_for_select_role_toc.verify|verify} messages.
     * @param message wait_for_select_role_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iwait_for_select_role_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a wait_for_select_role_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns wait_for_select_role_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): wait_for_select_role_toc;

    /**
     * Decodes a wait_for_select_role_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns wait_for_select_role_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): wait_for_select_role_toc;

    /**
     * Verifies a wait_for_select_role_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a wait_for_select_role_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns wait_for_select_role_toc
     */
    public static fromObject(object: { [k: string]: any }): wait_for_select_role_toc;

    /**
     * Creates a plain object from a wait_for_select_role_toc message. Also converts values to other types if specified.
     * @param message wait_for_select_role_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: wait_for_select_role_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this wait_for_select_role_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for wait_for_select_role_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an auto_play_tos. */
export class auto_play_tos implements Iauto_play_tos {

    /**
     * Constructs a new auto_play_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iauto_play_tos);

    /** auto_play_tos enable. */
    public enable: boolean;

    /**
     * Creates a new auto_play_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns auto_play_tos instance
     */
    public static create(properties?: Iauto_play_tos): auto_play_tos;

    /**
     * Encodes the specified auto_play_tos message. Does not implicitly {@link auto_play_tos.verify|verify} messages.
     * @param message auto_play_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iauto_play_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified auto_play_tos message, length delimited. Does not implicitly {@link auto_play_tos.verify|verify} messages.
     * @param message auto_play_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iauto_play_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an auto_play_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns auto_play_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auto_play_tos;

    /**
     * Decodes an auto_play_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns auto_play_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auto_play_tos;

    /**
     * Verifies an auto_play_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an auto_play_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns auto_play_tos
     */
    public static fromObject(object: { [k: string]: any }): auto_play_tos;

    /**
     * Creates a plain object from an auto_play_tos message. Also converts values to other types if specified.
     * @param message auto_play_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: auto_play_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this auto_play_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for auto_play_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an auto_play_toc. */
export class auto_play_toc implements Iauto_play_toc {

    /**
     * Constructs a new auto_play_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iauto_play_toc);

    /** auto_play_toc enable. */
    public enable: boolean;

    /**
     * Creates a new auto_play_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns auto_play_toc instance
     */
    public static create(properties?: Iauto_play_toc): auto_play_toc;

    /**
     * Encodes the specified auto_play_toc message. Does not implicitly {@link auto_play_toc.verify|verify} messages.
     * @param message auto_play_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iauto_play_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified auto_play_toc message, length delimited. Does not implicitly {@link auto_play_toc.verify|verify} messages.
     * @param message auto_play_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iauto_play_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an auto_play_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns auto_play_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auto_play_toc;

    /**
     * Decodes an auto_play_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns auto_play_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): auto_play_toc;

    /**
     * Verifies an auto_play_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an auto_play_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns auto_play_toc
     */
    public static fromObject(object: { [k: string]: any }): auto_play_toc;

    /**
     * Creates a plain object from an auto_play_toc message. Also converts values to other types if specified.
     * @param message auto_play_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: auto_play_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this auto_play_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for auto_play_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a select_role_tos. */
export class select_role_tos implements Iselect_role_tos {

    /**
     * Constructs a new select_role_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iselect_role_tos);

    /** select_role_tos role. */
    public role: role;

    /**
     * Creates a new select_role_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns select_role_tos instance
     */
    public static create(properties?: Iselect_role_tos): select_role_tos;

    /**
     * Encodes the specified select_role_tos message. Does not implicitly {@link select_role_tos.verify|verify} messages.
     * @param message select_role_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iselect_role_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified select_role_tos message, length delimited. Does not implicitly {@link select_role_tos.verify|verify} messages.
     * @param message select_role_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iselect_role_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a select_role_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns select_role_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): select_role_tos;

    /**
     * Decodes a select_role_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns select_role_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): select_role_tos;

    /**
     * Verifies a select_role_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a select_role_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns select_role_tos
     */
    public static fromObject(object: { [k: string]: any }): select_role_tos;

    /**
     * Creates a plain object from a select_role_tos message. Also converts values to other types if specified.
     * @param message select_role_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: select_role_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this select_role_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for select_role_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a select_role_toc. */
export class select_role_toc implements Iselect_role_toc {

    /**
     * Constructs a new select_role_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iselect_role_toc);

    /** select_role_toc role. */
    public role: role;

    /**
     * Creates a new select_role_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns select_role_toc instance
     */
    public static create(properties?: Iselect_role_toc): select_role_toc;

    /**
     * Encodes the specified select_role_toc message. Does not implicitly {@link select_role_toc.verify|verify} messages.
     * @param message select_role_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iselect_role_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified select_role_toc message, length delimited. Does not implicitly {@link select_role_toc.verify|verify} messages.
     * @param message select_role_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iselect_role_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a select_role_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns select_role_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): select_role_toc;

    /**
     * Decodes a select_role_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns select_role_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): select_role_toc;

    /**
     * Verifies a select_role_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a select_role_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns select_role_toc
     */
    public static fromObject(object: { [k: string]: any }): select_role_toc;

    /**
     * Creates a plain object from a select_role_toc message. Also converts values to other types if specified.
     * @param message select_role_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: select_role_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this select_role_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for select_role_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an init_toc. */
export class init_toc implements Iinit_toc {

    /**
     * Constructs a new init_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iinit_toc);

    /** init_toc playerCount. */
    public playerCount: number;

    /** init_toc identity. */
    public identity: color;

    /** init_toc secretTask. */
    public secretTask: secret_task;

    /** init_toc roles. */
    public roles: role[];

    /** init_toc names. */
    public names: string[];

    /**
     * Creates a new init_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns init_toc instance
     */
    public static create(properties?: Iinit_toc): init_toc;

    /**
     * Encodes the specified init_toc message. Does not implicitly {@link init_toc.verify|verify} messages.
     * @param message init_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iinit_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified init_toc message, length delimited. Does not implicitly {@link init_toc.verify|verify} messages.
     * @param message init_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iinit_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an init_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns init_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): init_toc;

    /**
     * Decodes an init_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns init_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): init_toc;

    /**
     * Verifies an init_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an init_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns init_toc
     */
    public static fromObject(object: { [k: string]: any }): init_toc;

    /**
     * Creates a plain object from an init_toc message. Also converts values to other types if specified.
     * @param message init_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: init_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this init_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for init_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a notify_role_update_toc. */
export class notify_role_update_toc implements Inotify_role_update_toc {

    /**
     * Constructs a new notify_role_update_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Inotify_role_update_toc);

    /** notify_role_update_toc playerId. */
    public playerId: number;

    /** notify_role_update_toc role. */
    public role: role;

    /**
     * Creates a new notify_role_update_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns notify_role_update_toc instance
     */
    public static create(properties?: Inotify_role_update_toc): notify_role_update_toc;

    /**
     * Encodes the specified notify_role_update_toc message. Does not implicitly {@link notify_role_update_toc.verify|verify} messages.
     * @param message notify_role_update_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Inotify_role_update_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified notify_role_update_toc message, length delimited. Does not implicitly {@link notify_role_update_toc.verify|verify} messages.
     * @param message notify_role_update_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Inotify_role_update_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a notify_role_update_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns notify_role_update_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notify_role_update_toc;

    /**
     * Decodes a notify_role_update_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns notify_role_update_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notify_role_update_toc;

    /**
     * Verifies a notify_role_update_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a notify_role_update_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns notify_role_update_toc
     */
    public static fromObject(object: { [k: string]: any }): notify_role_update_toc;

    /**
     * Creates a plain object from a notify_role_update_toc message. Also converts values to other types if specified.
     * @param message notify_role_update_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: notify_role_update_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this notify_role_update_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for notify_role_update_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an add_card_toc. */
export class add_card_toc implements Iadd_card_toc {

    /**
     * Constructs a new add_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iadd_card_toc);

    /** add_card_toc playerId. */
    public playerId: number;

    /** add_card_toc unknownCardCount. */
    public unknownCardCount: number;

    /** add_card_toc cards. */
    public cards: Icard[];

    /**
     * Creates a new add_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns add_card_toc instance
     */
    public static create(properties?: Iadd_card_toc): add_card_toc;

    /**
     * Encodes the specified add_card_toc message. Does not implicitly {@link add_card_toc.verify|verify} messages.
     * @param message add_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iadd_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified add_card_toc message, length delimited. Does not implicitly {@link add_card_toc.verify|verify} messages.
     * @param message add_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iadd_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an add_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns add_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): add_card_toc;

    /**
     * Decodes an add_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns add_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): add_card_toc;

    /**
     * Verifies an add_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an add_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns add_card_toc
     */
    public static fromObject(object: { [k: string]: any }): add_card_toc;

    /**
     * Creates a plain object from an add_card_toc message. Also converts values to other types if specified.
     * @param message add_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: add_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this add_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for add_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_shi_tan_tos. */
export class use_shi_tan_tos implements Iuse_shi_tan_tos {

    /**
     * Constructs a new use_shi_tan_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_shi_tan_tos);

    /** use_shi_tan_tos cardId. */
    public cardId: number;

    /** use_shi_tan_tos playerId. */
    public playerId: number;

    /** use_shi_tan_tos seq. */
    public seq: number;

    /**
     * Creates a new use_shi_tan_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_shi_tan_tos instance
     */
    public static create(properties?: Iuse_shi_tan_tos): use_shi_tan_tos;

    /**
     * Encodes the specified use_shi_tan_tos message. Does not implicitly {@link use_shi_tan_tos.verify|verify} messages.
     * @param message use_shi_tan_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_shi_tan_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_shi_tan_tos message, length delimited. Does not implicitly {@link use_shi_tan_tos.verify|verify} messages.
     * @param message use_shi_tan_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_shi_tan_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_shi_tan_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_shi_tan_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_shi_tan_tos;

    /**
     * Decodes a use_shi_tan_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_shi_tan_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_shi_tan_tos;

    /**
     * Verifies a use_shi_tan_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_shi_tan_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_shi_tan_tos
     */
    public static fromObject(object: { [k: string]: any }): use_shi_tan_tos;

    /**
     * Creates a plain object from a use_shi_tan_tos message. Also converts values to other types if specified.
     * @param message use_shi_tan_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_shi_tan_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_shi_tan_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_shi_tan_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_shi_tan_toc. */
export class use_shi_tan_toc implements Iuse_shi_tan_toc {

    /**
     * Constructs a new use_shi_tan_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_shi_tan_toc);

    /** use_shi_tan_toc playerId. */
    public playerId: number;

    /** use_shi_tan_toc targetPlayerId. */
    public targetPlayerId: number;

    /** use_shi_tan_toc cardId. */
    public cardId: number;

    /**
     * Creates a new use_shi_tan_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_shi_tan_toc instance
     */
    public static create(properties?: Iuse_shi_tan_toc): use_shi_tan_toc;

    /**
     * Encodes the specified use_shi_tan_toc message. Does not implicitly {@link use_shi_tan_toc.verify|verify} messages.
     * @param message use_shi_tan_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_shi_tan_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_shi_tan_toc message, length delimited. Does not implicitly {@link use_shi_tan_toc.verify|verify} messages.
     * @param message use_shi_tan_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_shi_tan_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_shi_tan_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_shi_tan_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_shi_tan_toc;

    /**
     * Decodes a use_shi_tan_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_shi_tan_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_shi_tan_toc;

    /**
     * Verifies a use_shi_tan_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_shi_tan_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_shi_tan_toc
     */
    public static fromObject(object: { [k: string]: any }): use_shi_tan_toc;

    /**
     * Creates a plain object from a use_shi_tan_toc message. Also converts values to other types if specified.
     * @param message use_shi_tan_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_shi_tan_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_shi_tan_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_shi_tan_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a show_shi_tan_toc. */
export class show_shi_tan_toc implements Ishow_shi_tan_toc {

    /**
     * Constructs a new show_shi_tan_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ishow_shi_tan_toc);

    /** show_shi_tan_toc playerId. */
    public playerId: number;

    /** show_shi_tan_toc targetPlayerId. */
    public targetPlayerId: number;

    /** show_shi_tan_toc card. */
    public card?: (Icard|null);

    /** show_shi_tan_toc waitingSecond. */
    public waitingSecond: number;

    /** show_shi_tan_toc seq. */
    public seq: number;

    /**
     * Creates a new show_shi_tan_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns show_shi_tan_toc instance
     */
    public static create(properties?: Ishow_shi_tan_toc): show_shi_tan_toc;

    /**
     * Encodes the specified show_shi_tan_toc message. Does not implicitly {@link show_shi_tan_toc.verify|verify} messages.
     * @param message show_shi_tan_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ishow_shi_tan_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified show_shi_tan_toc message, length delimited. Does not implicitly {@link show_shi_tan_toc.verify|verify} messages.
     * @param message show_shi_tan_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ishow_shi_tan_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a show_shi_tan_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns show_shi_tan_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): show_shi_tan_toc;

    /**
     * Decodes a show_shi_tan_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns show_shi_tan_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): show_shi_tan_toc;

    /**
     * Verifies a show_shi_tan_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a show_shi_tan_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns show_shi_tan_toc
     */
    public static fromObject(object: { [k: string]: any }): show_shi_tan_toc;

    /**
     * Creates a plain object from a show_shi_tan_toc message. Also converts values to other types if specified.
     * @param message show_shi_tan_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: show_shi_tan_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this show_shi_tan_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for show_shi_tan_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an execute_shi_tan_tos. */
export class execute_shi_tan_tos implements Iexecute_shi_tan_tos {

    /**
     * Constructs a new execute_shi_tan_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iexecute_shi_tan_tos);

    /** execute_shi_tan_tos cardId. */
    public cardId: number[];

    /** execute_shi_tan_tos seq. */
    public seq: number;

    /**
     * Creates a new execute_shi_tan_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns execute_shi_tan_tos instance
     */
    public static create(properties?: Iexecute_shi_tan_tos): execute_shi_tan_tos;

    /**
     * Encodes the specified execute_shi_tan_tos message. Does not implicitly {@link execute_shi_tan_tos.verify|verify} messages.
     * @param message execute_shi_tan_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iexecute_shi_tan_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified execute_shi_tan_tos message, length delimited. Does not implicitly {@link execute_shi_tan_tos.verify|verify} messages.
     * @param message execute_shi_tan_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iexecute_shi_tan_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an execute_shi_tan_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns execute_shi_tan_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): execute_shi_tan_tos;

    /**
     * Decodes an execute_shi_tan_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns execute_shi_tan_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): execute_shi_tan_tos;

    /**
     * Verifies an execute_shi_tan_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an execute_shi_tan_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns execute_shi_tan_tos
     */
    public static fromObject(object: { [k: string]: any }): execute_shi_tan_tos;

    /**
     * Creates a plain object from an execute_shi_tan_tos message. Also converts values to other types if specified.
     * @param message execute_shi_tan_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: execute_shi_tan_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this execute_shi_tan_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for execute_shi_tan_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an execute_shi_tan_toc. */
export class execute_shi_tan_toc implements Iexecute_shi_tan_toc {

    /**
     * Constructs a new execute_shi_tan_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iexecute_shi_tan_toc);

    /** execute_shi_tan_toc playerId. */
    public playerId: number;

    /** execute_shi_tan_toc isDrawCard. */
    public isDrawCard: boolean;

    /**
     * Creates a new execute_shi_tan_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns execute_shi_tan_toc instance
     */
    public static create(properties?: Iexecute_shi_tan_toc): execute_shi_tan_toc;

    /**
     * Encodes the specified execute_shi_tan_toc message. Does not implicitly {@link execute_shi_tan_toc.verify|verify} messages.
     * @param message execute_shi_tan_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iexecute_shi_tan_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified execute_shi_tan_toc message, length delimited. Does not implicitly {@link execute_shi_tan_toc.verify|verify} messages.
     * @param message execute_shi_tan_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iexecute_shi_tan_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an execute_shi_tan_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns execute_shi_tan_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): execute_shi_tan_toc;

    /**
     * Decodes an execute_shi_tan_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns execute_shi_tan_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): execute_shi_tan_toc;

    /**
     * Verifies an execute_shi_tan_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an execute_shi_tan_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns execute_shi_tan_toc
     */
    public static fromObject(object: { [k: string]: any }): execute_shi_tan_toc;

    /**
     * Creates a plain object from an execute_shi_tan_toc message. Also converts values to other types if specified.
     * @param message execute_shi_tan_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: execute_shi_tan_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this execute_shi_tan_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for execute_shi_tan_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a sync_deck_num_toc. */
export class sync_deck_num_toc implements Isync_deck_num_toc {

    /**
     * Constructs a new sync_deck_num_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Isync_deck_num_toc);

    /** sync_deck_num_toc num. */
    public num: number;

    /** sync_deck_num_toc shuffled. */
    public shuffled: boolean;

    /**
     * Creates a new sync_deck_num_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns sync_deck_num_toc instance
     */
    public static create(properties?: Isync_deck_num_toc): sync_deck_num_toc;

    /**
     * Encodes the specified sync_deck_num_toc message. Does not implicitly {@link sync_deck_num_toc.verify|verify} messages.
     * @param message sync_deck_num_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Isync_deck_num_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified sync_deck_num_toc message, length delimited. Does not implicitly {@link sync_deck_num_toc.verify|verify} messages.
     * @param message sync_deck_num_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Isync_deck_num_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a sync_deck_num_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns sync_deck_num_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): sync_deck_num_toc;

    /**
     * Decodes a sync_deck_num_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns sync_deck_num_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): sync_deck_num_toc;

    /**
     * Verifies a sync_deck_num_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a sync_deck_num_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns sync_deck_num_toc
     */
    public static fromObject(object: { [k: string]: any }): sync_deck_num_toc;

    /**
     * Creates a plain object from a sync_deck_num_toc message. Also converts values to other types if specified.
     * @param message sync_deck_num_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: sync_deck_num_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this sync_deck_num_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for sync_deck_num_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a discard_card_toc. */
export class discard_card_toc implements Idiscard_card_toc {

    /**
     * Constructs a new discard_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Idiscard_card_toc);

    /** discard_card_toc playerId. */
    public playerId: number;

    /** discard_card_toc cards. */
    public cards: Icard[];

    /**
     * Creates a new discard_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns discard_card_toc instance
     */
    public static create(properties?: Idiscard_card_toc): discard_card_toc;

    /**
     * Encodes the specified discard_card_toc message. Does not implicitly {@link discard_card_toc.verify|verify} messages.
     * @param message discard_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Idiscard_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified discard_card_toc message, length delimited. Does not implicitly {@link discard_card_toc.verify|verify} messages.
     * @param message discard_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Idiscard_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a discard_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns discard_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): discard_card_toc;

    /**
     * Decodes a discard_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns discard_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): discard_card_toc;

    /**
     * Verifies a discard_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a discard_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns discard_card_toc
     */
    public static fromObject(object: { [k: string]: any }): discard_card_toc;

    /**
     * Creates a plain object from a discard_card_toc message. Also converts values to other types if specified.
     * @param message discard_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: discard_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this discard_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for discard_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a notify_phase_toc. */
export class notify_phase_toc implements Inotify_phase_toc {

    /**
     * Constructs a new notify_phase_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Inotify_phase_toc);

    /** notify_phase_toc currentPlayerId. */
    public currentPlayerId: number;

    /** notify_phase_toc currentPhase. */
    public currentPhase: phase;

    /** notify_phase_toc messagePlayerId. */
    public messagePlayerId: number;

    /** notify_phase_toc messageCardDir. */
    public messageCardDir: direction;

    /** notify_phase_toc messageCard. */
    public messageCard?: (Icard|null);

    /** notify_phase_toc waitingPlayerId. */
    public waitingPlayerId: number;

    /** notify_phase_toc waitingSecond. */
    public waitingSecond: number;

    /** notify_phase_toc seq. */
    public seq: number;

    /** notify_phase_toc senderId. */
    public senderId: number;

    /**
     * Creates a new notify_phase_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns notify_phase_toc instance
     */
    public static create(properties?: Inotify_phase_toc): notify_phase_toc;

    /**
     * Encodes the specified notify_phase_toc message. Does not implicitly {@link notify_phase_toc.verify|verify} messages.
     * @param message notify_phase_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Inotify_phase_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified notify_phase_toc message, length delimited. Does not implicitly {@link notify_phase_toc.verify|verify} messages.
     * @param message notify_phase_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Inotify_phase_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a notify_phase_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns notify_phase_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notify_phase_toc;

    /**
     * Decodes a notify_phase_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns notify_phase_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notify_phase_toc;

    /**
     * Verifies a notify_phase_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a notify_phase_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns notify_phase_toc
     */
    public static fromObject(object: { [k: string]: any }): notify_phase_toc;

    /**
     * Creates a plain object from a notify_phase_toc message. Also converts values to other types if specified.
     * @param message notify_phase_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: notify_phase_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this notify_phase_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for notify_phase_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an end_main_phase_tos. */
export class end_main_phase_tos implements Iend_main_phase_tos {

    /**
     * Constructs a new end_main_phase_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iend_main_phase_tos);

    /** end_main_phase_tos seq. */
    public seq: number;

    /**
     * Creates a new end_main_phase_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns end_main_phase_tos instance
     */
    public static create(properties?: Iend_main_phase_tos): end_main_phase_tos;

    /**
     * Encodes the specified end_main_phase_tos message. Does not implicitly {@link end_main_phase_tos.verify|verify} messages.
     * @param message end_main_phase_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iend_main_phase_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified end_main_phase_tos message, length delimited. Does not implicitly {@link end_main_phase_tos.verify|verify} messages.
     * @param message end_main_phase_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iend_main_phase_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an end_main_phase_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns end_main_phase_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): end_main_phase_tos;

    /**
     * Decodes an end_main_phase_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns end_main_phase_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): end_main_phase_tos;

    /**
     * Verifies an end_main_phase_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an end_main_phase_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns end_main_phase_tos
     */
    public static fromObject(object: { [k: string]: any }): end_main_phase_tos;

    /**
     * Creates a plain object from an end_main_phase_tos message. Also converts values to other types if specified.
     * @param message end_main_phase_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: end_main_phase_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this end_main_phase_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for end_main_phase_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_li_you_tos. */
export class use_li_you_tos implements Iuse_li_you_tos {

    /**
     * Constructs a new use_li_you_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_li_you_tos);

    /** use_li_you_tos cardId. */
    public cardId: number;

    /** use_li_you_tos playerId. */
    public playerId: number;

    /** use_li_you_tos seq. */
    public seq: number;

    /**
     * Creates a new use_li_you_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_li_you_tos instance
     */
    public static create(properties?: Iuse_li_you_tos): use_li_you_tos;

    /**
     * Encodes the specified use_li_you_tos message. Does not implicitly {@link use_li_you_tos.verify|verify} messages.
     * @param message use_li_you_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_li_you_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_li_you_tos message, length delimited. Does not implicitly {@link use_li_you_tos.verify|verify} messages.
     * @param message use_li_you_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_li_you_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_li_you_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_li_you_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_li_you_tos;

    /**
     * Decodes a use_li_you_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_li_you_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_li_you_tos;

    /**
     * Verifies a use_li_you_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_li_you_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_li_you_tos
     */
    public static fromObject(object: { [k: string]: any }): use_li_you_tos;

    /**
     * Creates a plain object from a use_li_you_tos message. Also converts values to other types if specified.
     * @param message use_li_you_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_li_you_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_li_you_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_li_you_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_li_you_toc. */
export class use_li_you_toc implements Iuse_li_you_toc {

    /**
     * Constructs a new use_li_you_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_li_you_toc);

    /** use_li_you_toc playerId. */
    public playerId: number;

    /** use_li_you_toc targetPlayerId. */
    public targetPlayerId: number;

    /** use_li_you_toc liYouCard. */
    public liYouCard?: (Icard|null);

    /** use_li_you_toc messageCard. */
    public messageCard?: (Icard|null);

    /** use_li_you_toc joinIntoHand. */
    public joinIntoHand: boolean;

    /**
     * Creates a new use_li_you_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_li_you_toc instance
     */
    public static create(properties?: Iuse_li_you_toc): use_li_you_toc;

    /**
     * Encodes the specified use_li_you_toc message. Does not implicitly {@link use_li_you_toc.verify|verify} messages.
     * @param message use_li_you_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_li_you_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_li_you_toc message, length delimited. Does not implicitly {@link use_li_you_toc.verify|verify} messages.
     * @param message use_li_you_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_li_you_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_li_you_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_li_you_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_li_you_toc;

    /**
     * Decodes a use_li_you_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_li_you_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_li_you_toc;

    /**
     * Verifies a use_li_you_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_li_you_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_li_you_toc
     */
    public static fromObject(object: { [k: string]: any }): use_li_you_toc;

    /**
     * Creates a plain object from a use_li_you_toc message. Also converts values to other types if specified.
     * @param message use_li_you_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_li_you_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_li_you_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_li_you_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_ping_heng_tos. */
export class use_ping_heng_tos implements Iuse_ping_heng_tos {

    /**
     * Constructs a new use_ping_heng_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_ping_heng_tos);

    /** use_ping_heng_tos cardId. */
    public cardId: number;

    /** use_ping_heng_tos playerId. */
    public playerId: number;

    /** use_ping_heng_tos seq. */
    public seq: number;

    /**
     * Creates a new use_ping_heng_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_ping_heng_tos instance
     */
    public static create(properties?: Iuse_ping_heng_tos): use_ping_heng_tos;

    /**
     * Encodes the specified use_ping_heng_tos message. Does not implicitly {@link use_ping_heng_tos.verify|verify} messages.
     * @param message use_ping_heng_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_ping_heng_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_ping_heng_tos message, length delimited. Does not implicitly {@link use_ping_heng_tos.verify|verify} messages.
     * @param message use_ping_heng_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_ping_heng_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_ping_heng_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_ping_heng_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_ping_heng_tos;

    /**
     * Decodes a use_ping_heng_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_ping_heng_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_ping_heng_tos;

    /**
     * Verifies a use_ping_heng_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_ping_heng_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_ping_heng_tos
     */
    public static fromObject(object: { [k: string]: any }): use_ping_heng_tos;

    /**
     * Creates a plain object from a use_ping_heng_tos message. Also converts values to other types if specified.
     * @param message use_ping_heng_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_ping_heng_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_ping_heng_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_ping_heng_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_ping_heng_toc. */
export class use_ping_heng_toc implements Iuse_ping_heng_toc {

    /**
     * Constructs a new use_ping_heng_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_ping_heng_toc);

    /** use_ping_heng_toc playerId. */
    public playerId: number;

    /** use_ping_heng_toc targetPlayerId. */
    public targetPlayerId: number;

    /** use_ping_heng_toc pingHengCard. */
    public pingHengCard?: (Icard|null);

    /**
     * Creates a new use_ping_heng_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_ping_heng_toc instance
     */
    public static create(properties?: Iuse_ping_heng_toc): use_ping_heng_toc;

    /**
     * Encodes the specified use_ping_heng_toc message. Does not implicitly {@link use_ping_heng_toc.verify|verify} messages.
     * @param message use_ping_heng_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_ping_heng_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_ping_heng_toc message, length delimited. Does not implicitly {@link use_ping_heng_toc.verify|verify} messages.
     * @param message use_ping_heng_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_ping_heng_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_ping_heng_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_ping_heng_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_ping_heng_toc;

    /**
     * Decodes a use_ping_heng_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_ping_heng_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_ping_heng_toc;

    /**
     * Verifies a use_ping_heng_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_ping_heng_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_ping_heng_toc
     */
    public static fromObject(object: { [k: string]: any }): use_ping_heng_toc;

    /**
     * Creates a plain object from a use_ping_heng_toc message. Also converts values to other types if specified.
     * @param message use_ping_heng_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_ping_heng_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_ping_heng_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_ping_heng_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_wei_bi_tos. */
export class use_wei_bi_tos implements Iuse_wei_bi_tos {

    /**
     * Constructs a new use_wei_bi_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_wei_bi_tos);

    /** use_wei_bi_tos cardId. */
    public cardId: number;

    /** use_wei_bi_tos playerId. */
    public playerId: number;

    /** use_wei_bi_tos wantType. */
    public wantType: card_type;

    /** use_wei_bi_tos seq. */
    public seq: number;

    /**
     * Creates a new use_wei_bi_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_wei_bi_tos instance
     */
    public static create(properties?: Iuse_wei_bi_tos): use_wei_bi_tos;

    /**
     * Encodes the specified use_wei_bi_tos message. Does not implicitly {@link use_wei_bi_tos.verify|verify} messages.
     * @param message use_wei_bi_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_wei_bi_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_wei_bi_tos message, length delimited. Does not implicitly {@link use_wei_bi_tos.verify|verify} messages.
     * @param message use_wei_bi_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_wei_bi_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_wei_bi_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_wei_bi_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_wei_bi_tos;

    /**
     * Decodes a use_wei_bi_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_wei_bi_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_wei_bi_tos;

    /**
     * Verifies a use_wei_bi_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_wei_bi_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_wei_bi_tos
     */
    public static fromObject(object: { [k: string]: any }): use_wei_bi_tos;

    /**
     * Creates a plain object from a use_wei_bi_tos message. Also converts values to other types if specified.
     * @param message use_wei_bi_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_wei_bi_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_wei_bi_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_wei_bi_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a wei_bi_wait_for_give_card_toc. */
export class wei_bi_wait_for_give_card_toc implements Iwei_bi_wait_for_give_card_toc {

    /**
     * Constructs a new wei_bi_wait_for_give_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iwei_bi_wait_for_give_card_toc);

    /** wei_bi_wait_for_give_card_toc card. */
    public card?: (Icard|null);

    /** wei_bi_wait_for_give_card_toc playerId. */
    public playerId: number;

    /** wei_bi_wait_for_give_card_toc targetPlayerId. */
    public targetPlayerId: number;

    /** wei_bi_wait_for_give_card_toc wantType. */
    public wantType: card_type;

    /** wei_bi_wait_for_give_card_toc waitingSecond. */
    public waitingSecond: number;

    /** wei_bi_wait_for_give_card_toc seq. */
    public seq: number;

    /**
     * Creates a new wei_bi_wait_for_give_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns wei_bi_wait_for_give_card_toc instance
     */
    public static create(properties?: Iwei_bi_wait_for_give_card_toc): wei_bi_wait_for_give_card_toc;

    /**
     * Encodes the specified wei_bi_wait_for_give_card_toc message. Does not implicitly {@link wei_bi_wait_for_give_card_toc.verify|verify} messages.
     * @param message wei_bi_wait_for_give_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iwei_bi_wait_for_give_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified wei_bi_wait_for_give_card_toc message, length delimited. Does not implicitly {@link wei_bi_wait_for_give_card_toc.verify|verify} messages.
     * @param message wei_bi_wait_for_give_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iwei_bi_wait_for_give_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a wei_bi_wait_for_give_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns wei_bi_wait_for_give_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): wei_bi_wait_for_give_card_toc;

    /**
     * Decodes a wei_bi_wait_for_give_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns wei_bi_wait_for_give_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): wei_bi_wait_for_give_card_toc;

    /**
     * Verifies a wei_bi_wait_for_give_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a wei_bi_wait_for_give_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns wei_bi_wait_for_give_card_toc
     */
    public static fromObject(object: { [k: string]: any }): wei_bi_wait_for_give_card_toc;

    /**
     * Creates a plain object from a wei_bi_wait_for_give_card_toc message. Also converts values to other types if specified.
     * @param message wei_bi_wait_for_give_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: wei_bi_wait_for_give_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this wei_bi_wait_for_give_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for wei_bi_wait_for_give_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a wei_bi_give_card_tos. */
export class wei_bi_give_card_tos implements Iwei_bi_give_card_tos {

    /**
     * Constructs a new wei_bi_give_card_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iwei_bi_give_card_tos);

    /** wei_bi_give_card_tos cardId. */
    public cardId: number;

    /** wei_bi_give_card_tos seq. */
    public seq: number;

    /**
     * Creates a new wei_bi_give_card_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns wei_bi_give_card_tos instance
     */
    public static create(properties?: Iwei_bi_give_card_tos): wei_bi_give_card_tos;

    /**
     * Encodes the specified wei_bi_give_card_tos message. Does not implicitly {@link wei_bi_give_card_tos.verify|verify} messages.
     * @param message wei_bi_give_card_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iwei_bi_give_card_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified wei_bi_give_card_tos message, length delimited. Does not implicitly {@link wei_bi_give_card_tos.verify|verify} messages.
     * @param message wei_bi_give_card_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iwei_bi_give_card_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a wei_bi_give_card_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns wei_bi_give_card_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): wei_bi_give_card_tos;

    /**
     * Decodes a wei_bi_give_card_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns wei_bi_give_card_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): wei_bi_give_card_tos;

    /**
     * Verifies a wei_bi_give_card_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a wei_bi_give_card_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns wei_bi_give_card_tos
     */
    public static fromObject(object: { [k: string]: any }): wei_bi_give_card_tos;

    /**
     * Creates a plain object from a wei_bi_give_card_tos message. Also converts values to other types if specified.
     * @param message wei_bi_give_card_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: wei_bi_give_card_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this wei_bi_give_card_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for wei_bi_give_card_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a wei_bi_give_card_toc. */
export class wei_bi_give_card_toc implements Iwei_bi_give_card_toc {

    /**
     * Constructs a new wei_bi_give_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iwei_bi_give_card_toc);

    /** wei_bi_give_card_toc playerId. */
    public playerId: number;

    /** wei_bi_give_card_toc targetPlayerId. */
    public targetPlayerId: number;

    /** wei_bi_give_card_toc card. */
    public card?: (Icard|null);

    /**
     * Creates a new wei_bi_give_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns wei_bi_give_card_toc instance
     */
    public static create(properties?: Iwei_bi_give_card_toc): wei_bi_give_card_toc;

    /**
     * Encodes the specified wei_bi_give_card_toc message. Does not implicitly {@link wei_bi_give_card_toc.verify|verify} messages.
     * @param message wei_bi_give_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iwei_bi_give_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified wei_bi_give_card_toc message, length delimited. Does not implicitly {@link wei_bi_give_card_toc.verify|verify} messages.
     * @param message wei_bi_give_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iwei_bi_give_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a wei_bi_give_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns wei_bi_give_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): wei_bi_give_card_toc;

    /**
     * Decodes a wei_bi_give_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns wei_bi_give_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): wei_bi_give_card_toc;

    /**
     * Verifies a wei_bi_give_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a wei_bi_give_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns wei_bi_give_card_toc
     */
    public static fromObject(object: { [k: string]: any }): wei_bi_give_card_toc;

    /**
     * Creates a plain object from a wei_bi_give_card_toc message. Also converts values to other types if specified.
     * @param message wei_bi_give_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: wei_bi_give_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this wei_bi_give_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for wei_bi_give_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a wei_bi_show_hand_card_toc. */
export class wei_bi_show_hand_card_toc implements Iwei_bi_show_hand_card_toc {

    /**
     * Constructs a new wei_bi_show_hand_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iwei_bi_show_hand_card_toc);

    /** wei_bi_show_hand_card_toc card. */
    public card?: (Icard|null);

    /** wei_bi_show_hand_card_toc playerId. */
    public playerId: number;

    /** wei_bi_show_hand_card_toc wantType. */
    public wantType: card_type;

    /** wei_bi_show_hand_card_toc targetPlayerId. */
    public targetPlayerId: number;

    /** wei_bi_show_hand_card_toc cards. */
    public cards: Icard[];

    /**
     * Creates a new wei_bi_show_hand_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns wei_bi_show_hand_card_toc instance
     */
    public static create(properties?: Iwei_bi_show_hand_card_toc): wei_bi_show_hand_card_toc;

    /**
     * Encodes the specified wei_bi_show_hand_card_toc message. Does not implicitly {@link wei_bi_show_hand_card_toc.verify|verify} messages.
     * @param message wei_bi_show_hand_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iwei_bi_show_hand_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified wei_bi_show_hand_card_toc message, length delimited. Does not implicitly {@link wei_bi_show_hand_card_toc.verify|verify} messages.
     * @param message wei_bi_show_hand_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iwei_bi_show_hand_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a wei_bi_show_hand_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns wei_bi_show_hand_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): wei_bi_show_hand_card_toc;

    /**
     * Decodes a wei_bi_show_hand_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns wei_bi_show_hand_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): wei_bi_show_hand_card_toc;

    /**
     * Verifies a wei_bi_show_hand_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a wei_bi_show_hand_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns wei_bi_show_hand_card_toc
     */
    public static fromObject(object: { [k: string]: any }): wei_bi_show_hand_card_toc;

    /**
     * Creates a plain object from a wei_bi_show_hand_card_toc message. Also converts values to other types if specified.
     * @param message wei_bi_show_hand_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: wei_bi_show_hand_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this wei_bi_show_hand_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for wei_bi_show_hand_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_cheng_qing_tos. */
export class use_cheng_qing_tos implements Iuse_cheng_qing_tos {

    /**
     * Constructs a new use_cheng_qing_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_cheng_qing_tos);

    /** use_cheng_qing_tos cardId. */
    public cardId: number;

    /** use_cheng_qing_tos playerId. */
    public playerId: number;

    /** use_cheng_qing_tos targetCardId. */
    public targetCardId: number;

    /** use_cheng_qing_tos seq. */
    public seq: number;

    /**
     * Creates a new use_cheng_qing_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_cheng_qing_tos instance
     */
    public static create(properties?: Iuse_cheng_qing_tos): use_cheng_qing_tos;

    /**
     * Encodes the specified use_cheng_qing_tos message. Does not implicitly {@link use_cheng_qing_tos.verify|verify} messages.
     * @param message use_cheng_qing_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_cheng_qing_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_cheng_qing_tos message, length delimited. Does not implicitly {@link use_cheng_qing_tos.verify|verify} messages.
     * @param message use_cheng_qing_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_cheng_qing_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_cheng_qing_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_cheng_qing_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_cheng_qing_tos;

    /**
     * Decodes a use_cheng_qing_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_cheng_qing_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_cheng_qing_tos;

    /**
     * Verifies a use_cheng_qing_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_cheng_qing_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_cheng_qing_tos
     */
    public static fromObject(object: { [k: string]: any }): use_cheng_qing_tos;

    /**
     * Creates a plain object from a use_cheng_qing_tos message. Also converts values to other types if specified.
     * @param message use_cheng_qing_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_cheng_qing_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_cheng_qing_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_cheng_qing_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_cheng_qing_toc. */
export class use_cheng_qing_toc implements Iuse_cheng_qing_toc {

    /**
     * Constructs a new use_cheng_qing_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_cheng_qing_toc);

    /** use_cheng_qing_toc card. */
    public card?: (Icard|null);

    /** use_cheng_qing_toc playerId. */
    public playerId: number;

    /** use_cheng_qing_toc targetPlayerId. */
    public targetPlayerId: number;

    /** use_cheng_qing_toc targetCardId. */
    public targetCardId: number;

    /**
     * Creates a new use_cheng_qing_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_cheng_qing_toc instance
     */
    public static create(properties?: Iuse_cheng_qing_toc): use_cheng_qing_toc;

    /**
     * Encodes the specified use_cheng_qing_toc message. Does not implicitly {@link use_cheng_qing_toc.verify|verify} messages.
     * @param message use_cheng_qing_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_cheng_qing_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_cheng_qing_toc message, length delimited. Does not implicitly {@link use_cheng_qing_toc.verify|verify} messages.
     * @param message use_cheng_qing_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_cheng_qing_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_cheng_qing_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_cheng_qing_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_cheng_qing_toc;

    /**
     * Decodes a use_cheng_qing_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_cheng_qing_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_cheng_qing_toc;

    /**
     * Verifies a use_cheng_qing_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_cheng_qing_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_cheng_qing_toc
     */
    public static fromObject(object: { [k: string]: any }): use_cheng_qing_toc;

    /**
     * Creates a plain object from a use_cheng_qing_toc message. Also converts values to other types if specified.
     * @param message use_cheng_qing_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_cheng_qing_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_cheng_qing_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_cheng_qing_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a send_message_card_tos. */
export class send_message_card_tos implements Isend_message_card_tos {

    /**
     * Constructs a new send_message_card_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Isend_message_card_tos);

    /** send_message_card_tos cardId. */
    public cardId: number;

    /** send_message_card_tos targetPlayerId. */
    public targetPlayerId: number;

    /** send_message_card_tos lockPlayerId. */
    public lockPlayerId: number[];

    /** send_message_card_tos cardDir. */
    public cardDir: direction;

    /** send_message_card_tos seq. */
    public seq: number;

    /**
     * Creates a new send_message_card_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns send_message_card_tos instance
     */
    public static create(properties?: Isend_message_card_tos): send_message_card_tos;

    /**
     * Encodes the specified send_message_card_tos message. Does not implicitly {@link send_message_card_tos.verify|verify} messages.
     * @param message send_message_card_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Isend_message_card_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified send_message_card_tos message, length delimited. Does not implicitly {@link send_message_card_tos.verify|verify} messages.
     * @param message send_message_card_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Isend_message_card_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a send_message_card_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns send_message_card_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): send_message_card_tos;

    /**
     * Decodes a send_message_card_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns send_message_card_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): send_message_card_tos;

    /**
     * Verifies a send_message_card_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a send_message_card_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns send_message_card_tos
     */
    public static fromObject(object: { [k: string]: any }): send_message_card_tos;

    /**
     * Creates a plain object from a send_message_card_tos message. Also converts values to other types if specified.
     * @param message send_message_card_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: send_message_card_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this send_message_card_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for send_message_card_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a send_message_card_toc. */
export class send_message_card_toc implements Isend_message_card_toc {

    /**
     * Constructs a new send_message_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Isend_message_card_toc);

    /** send_message_card_toc cardId. */
    public cardId: number;

    /** send_message_card_toc playerId. */
    public playerId: number;

    /** send_message_card_toc targetPlayerId. */
    public targetPlayerId: number;

    /** send_message_card_toc lockPlayerIds. */
    public lockPlayerIds: number[];

    /** send_message_card_toc cardDir. */
    public cardDir: direction;

    /** send_message_card_toc senderId. */
    public senderId: number;

    /**
     * Creates a new send_message_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns send_message_card_toc instance
     */
    public static create(properties?: Isend_message_card_toc): send_message_card_toc;

    /**
     * Encodes the specified send_message_card_toc message. Does not implicitly {@link send_message_card_toc.verify|verify} messages.
     * @param message send_message_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Isend_message_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified send_message_card_toc message, length delimited. Does not implicitly {@link send_message_card_toc.verify|verify} messages.
     * @param message send_message_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Isend_message_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a send_message_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns send_message_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): send_message_card_toc;

    /**
     * Decodes a send_message_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns send_message_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): send_message_card_toc;

    /**
     * Verifies a send_message_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a send_message_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns send_message_card_toc
     */
    public static fromObject(object: { [k: string]: any }): send_message_card_toc;

    /**
     * Creates a plain object from a send_message_card_toc message. Also converts values to other types if specified.
     * @param message send_message_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: send_message_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this send_message_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for send_message_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a choose_whether_receive_tos. */
export class choose_whether_receive_tos implements Ichoose_whether_receive_tos {

    /**
     * Constructs a new choose_whether_receive_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ichoose_whether_receive_tos);

    /** choose_whether_receive_tos receive. */
    public receive: boolean;

    /** choose_whether_receive_tos seq. */
    public seq: number;

    /**
     * Creates a new choose_whether_receive_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns choose_whether_receive_tos instance
     */
    public static create(properties?: Ichoose_whether_receive_tos): choose_whether_receive_tos;

    /**
     * Encodes the specified choose_whether_receive_tos message. Does not implicitly {@link choose_whether_receive_tos.verify|verify} messages.
     * @param message choose_whether_receive_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ichoose_whether_receive_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified choose_whether_receive_tos message, length delimited. Does not implicitly {@link choose_whether_receive_tos.verify|verify} messages.
     * @param message choose_whether_receive_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ichoose_whether_receive_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a choose_whether_receive_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns choose_whether_receive_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): choose_whether_receive_tos;

    /**
     * Decodes a choose_whether_receive_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns choose_whether_receive_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): choose_whether_receive_tos;

    /**
     * Verifies a choose_whether_receive_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a choose_whether_receive_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns choose_whether_receive_tos
     */
    public static fromObject(object: { [k: string]: any }): choose_whether_receive_tos;

    /**
     * Creates a plain object from a choose_whether_receive_tos message. Also converts values to other types if specified.
     * @param message choose_whether_receive_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: choose_whether_receive_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this choose_whether_receive_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for choose_whether_receive_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a choose_receive_toc. */
export class choose_receive_toc implements Ichoose_receive_toc {

    /**
     * Constructs a new choose_receive_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ichoose_receive_toc);

    /** choose_receive_toc playerId. */
    public playerId: number;

    /**
     * Creates a new choose_receive_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns choose_receive_toc instance
     */
    public static create(properties?: Ichoose_receive_toc): choose_receive_toc;

    /**
     * Encodes the specified choose_receive_toc message. Does not implicitly {@link choose_receive_toc.verify|verify} messages.
     * @param message choose_receive_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ichoose_receive_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified choose_receive_toc message, length delimited. Does not implicitly {@link choose_receive_toc.verify|verify} messages.
     * @param message choose_receive_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ichoose_receive_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a choose_receive_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns choose_receive_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): choose_receive_toc;

    /**
     * Decodes a choose_receive_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns choose_receive_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): choose_receive_toc;

    /**
     * Verifies a choose_receive_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a choose_receive_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns choose_receive_toc
     */
    public static fromObject(object: { [k: string]: any }): choose_receive_toc;

    /**
     * Creates a plain object from a choose_receive_toc message. Also converts values to other types if specified.
     * @param message choose_receive_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: choose_receive_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this choose_receive_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for choose_receive_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an end_fight_phase_tos. */
export class end_fight_phase_tos implements Iend_fight_phase_tos {

    /**
     * Constructs a new end_fight_phase_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iend_fight_phase_tos);

    /** end_fight_phase_tos seq. */
    public seq: number;

    /**
     * Creates a new end_fight_phase_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns end_fight_phase_tos instance
     */
    public static create(properties?: Iend_fight_phase_tos): end_fight_phase_tos;

    /**
     * Encodes the specified end_fight_phase_tos message. Does not implicitly {@link end_fight_phase_tos.verify|verify} messages.
     * @param message end_fight_phase_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iend_fight_phase_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified end_fight_phase_tos message, length delimited. Does not implicitly {@link end_fight_phase_tos.verify|verify} messages.
     * @param message end_fight_phase_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iend_fight_phase_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an end_fight_phase_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns end_fight_phase_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): end_fight_phase_tos;

    /**
     * Decodes an end_fight_phase_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns end_fight_phase_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): end_fight_phase_tos;

    /**
     * Verifies an end_fight_phase_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an end_fight_phase_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns end_fight_phase_tos
     */
    public static fromObject(object: { [k: string]: any }): end_fight_phase_tos;

    /**
     * Creates a plain object from an end_fight_phase_tos message. Also converts values to other types if specified.
     * @param message end_fight_phase_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: end_fight_phase_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this end_fight_phase_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for end_fight_phase_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a notify_dying_toc. */
export class notify_dying_toc implements Inotify_dying_toc {

    /**
     * Constructs a new notify_dying_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Inotify_dying_toc);

    /** notify_dying_toc playerId. */
    public playerId: number;

    /** notify_dying_toc loseGame. */
    public loseGame: boolean;

    /**
     * Creates a new notify_dying_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns notify_dying_toc instance
     */
    public static create(properties?: Inotify_dying_toc): notify_dying_toc;

    /**
     * Encodes the specified notify_dying_toc message. Does not implicitly {@link notify_dying_toc.verify|verify} messages.
     * @param message notify_dying_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Inotify_dying_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified notify_dying_toc message, length delimited. Does not implicitly {@link notify_dying_toc.verify|verify} messages.
     * @param message notify_dying_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Inotify_dying_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a notify_dying_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns notify_dying_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notify_dying_toc;

    /**
     * Decodes a notify_dying_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns notify_dying_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notify_dying_toc;

    /**
     * Verifies a notify_dying_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a notify_dying_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns notify_dying_toc
     */
    public static fromObject(object: { [k: string]: any }): notify_dying_toc;

    /**
     * Creates a plain object from a notify_dying_toc message. Also converts values to other types if specified.
     * @param message notify_dying_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: notify_dying_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this notify_dying_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for notify_dying_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a notify_die_toc. */
export class notify_die_toc implements Inotify_die_toc {

    /**
     * Constructs a new notify_die_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Inotify_die_toc);

    /** notify_die_toc playerId. */
    public playerId: number;

    /**
     * Creates a new notify_die_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns notify_die_toc instance
     */
    public static create(properties?: Inotify_die_toc): notify_die_toc;

    /**
     * Encodes the specified notify_die_toc message. Does not implicitly {@link notify_die_toc.verify|verify} messages.
     * @param message notify_die_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Inotify_die_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified notify_die_toc message, length delimited. Does not implicitly {@link notify_die_toc.verify|verify} messages.
     * @param message notify_die_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Inotify_die_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a notify_die_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns notify_die_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notify_die_toc;

    /**
     * Decodes a notify_die_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns notify_die_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notify_die_toc;

    /**
     * Verifies a notify_die_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a notify_die_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns notify_die_toc
     */
    public static fromObject(object: { [k: string]: any }): notify_die_toc;

    /**
     * Creates a plain object from a notify_die_toc message. Also converts values to other types if specified.
     * @param message notify_die_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: notify_die_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this notify_die_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for notify_die_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a notify_winner_toc. */
export class notify_winner_toc implements Inotify_winner_toc {

    /**
     * Constructs a new notify_winner_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Inotify_winner_toc);

    /** notify_winner_toc declarePlayerIds. */
    public declarePlayerIds: number[];

    /** notify_winner_toc winnerIds. */
    public winnerIds: number[];

    /** notify_winner_toc identity. */
    public identity: color[];

    /** notify_winner_toc secretTasks. */
    public secretTasks: secret_task[];

    /**
     * Creates a new notify_winner_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns notify_winner_toc instance
     */
    public static create(properties?: Inotify_winner_toc): notify_winner_toc;

    /**
     * Encodes the specified notify_winner_toc message. Does not implicitly {@link notify_winner_toc.verify|verify} messages.
     * @param message notify_winner_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Inotify_winner_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified notify_winner_toc message, length delimited. Does not implicitly {@link notify_winner_toc.verify|verify} messages.
     * @param message notify_winner_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Inotify_winner_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a notify_winner_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns notify_winner_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notify_winner_toc;

    /**
     * Decodes a notify_winner_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns notify_winner_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notify_winner_toc;

    /**
     * Verifies a notify_winner_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a notify_winner_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns notify_winner_toc
     */
    public static fromObject(object: { [k: string]: any }): notify_winner_toc;

    /**
     * Creates a plain object from a notify_winner_toc message. Also converts values to other types if specified.
     * @param message notify_winner_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: notify_winner_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this notify_winner_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for notify_winner_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a wait_for_cheng_qing_toc. */
export class wait_for_cheng_qing_toc implements Iwait_for_cheng_qing_toc {

    /**
     * Constructs a new wait_for_cheng_qing_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iwait_for_cheng_qing_toc);

    /** wait_for_cheng_qing_toc diePlayerId. */
    public diePlayerId: number;

    /** wait_for_cheng_qing_toc waitingPlayerId. */
    public waitingPlayerId: number;

    /** wait_for_cheng_qing_toc waitingSecond. */
    public waitingSecond: number;

    /** wait_for_cheng_qing_toc seq. */
    public seq: number;

    /**
     * Creates a new wait_for_cheng_qing_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns wait_for_cheng_qing_toc instance
     */
    public static create(properties?: Iwait_for_cheng_qing_toc): wait_for_cheng_qing_toc;

    /**
     * Encodes the specified wait_for_cheng_qing_toc message. Does not implicitly {@link wait_for_cheng_qing_toc.verify|verify} messages.
     * @param message wait_for_cheng_qing_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iwait_for_cheng_qing_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified wait_for_cheng_qing_toc message, length delimited. Does not implicitly {@link wait_for_cheng_qing_toc.verify|verify} messages.
     * @param message wait_for_cheng_qing_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iwait_for_cheng_qing_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a wait_for_cheng_qing_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns wait_for_cheng_qing_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): wait_for_cheng_qing_toc;

    /**
     * Decodes a wait_for_cheng_qing_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns wait_for_cheng_qing_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): wait_for_cheng_qing_toc;

    /**
     * Verifies a wait_for_cheng_qing_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a wait_for_cheng_qing_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns wait_for_cheng_qing_toc
     */
    public static fromObject(object: { [k: string]: any }): wait_for_cheng_qing_toc;

    /**
     * Creates a plain object from a wait_for_cheng_qing_toc message. Also converts values to other types if specified.
     * @param message wait_for_cheng_qing_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: wait_for_cheng_qing_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this wait_for_cheng_qing_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for wait_for_cheng_qing_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a cheng_qing_save_die_tos. */
export class cheng_qing_save_die_tos implements Icheng_qing_save_die_tos {

    /**
     * Constructs a new cheng_qing_save_die_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Icheng_qing_save_die_tos);

    /** cheng_qing_save_die_tos use. */
    public use: boolean;

    /** cheng_qing_save_die_tos cardId. */
    public cardId: number;

    /** cheng_qing_save_die_tos targetCardId. */
    public targetCardId: number;

    /** cheng_qing_save_die_tos seq. */
    public seq: number;

    /**
     * Creates a new cheng_qing_save_die_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns cheng_qing_save_die_tos instance
     */
    public static create(properties?: Icheng_qing_save_die_tos): cheng_qing_save_die_tos;

    /**
     * Encodes the specified cheng_qing_save_die_tos message. Does not implicitly {@link cheng_qing_save_die_tos.verify|verify} messages.
     * @param message cheng_qing_save_die_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Icheng_qing_save_die_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified cheng_qing_save_die_tos message, length delimited. Does not implicitly {@link cheng_qing_save_die_tos.verify|verify} messages.
     * @param message cheng_qing_save_die_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Icheng_qing_save_die_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a cheng_qing_save_die_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns cheng_qing_save_die_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): cheng_qing_save_die_tos;

    /**
     * Decodes a cheng_qing_save_die_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns cheng_qing_save_die_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): cheng_qing_save_die_tos;

    /**
     * Verifies a cheng_qing_save_die_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a cheng_qing_save_die_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns cheng_qing_save_die_tos
     */
    public static fromObject(object: { [k: string]: any }): cheng_qing_save_die_tos;

    /**
     * Creates a plain object from a cheng_qing_save_die_tos message. Also converts values to other types if specified.
     * @param message cheng_qing_save_die_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: cheng_qing_save_die_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this cheng_qing_save_die_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for cheng_qing_save_die_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a wait_for_die_give_card_toc. */
export class wait_for_die_give_card_toc implements Iwait_for_die_give_card_toc {

    /**
     * Constructs a new wait_for_die_give_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iwait_for_die_give_card_toc);

    /** wait_for_die_give_card_toc playerId. */
    public playerId: number;

    /** wait_for_die_give_card_toc waitingSecond. */
    public waitingSecond: number;

    /** wait_for_die_give_card_toc seq. */
    public seq: number;

    /**
     * Creates a new wait_for_die_give_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns wait_for_die_give_card_toc instance
     */
    public static create(properties?: Iwait_for_die_give_card_toc): wait_for_die_give_card_toc;

    /**
     * Encodes the specified wait_for_die_give_card_toc message. Does not implicitly {@link wait_for_die_give_card_toc.verify|verify} messages.
     * @param message wait_for_die_give_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iwait_for_die_give_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified wait_for_die_give_card_toc message, length delimited. Does not implicitly {@link wait_for_die_give_card_toc.verify|verify} messages.
     * @param message wait_for_die_give_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iwait_for_die_give_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a wait_for_die_give_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns wait_for_die_give_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): wait_for_die_give_card_toc;

    /**
     * Decodes a wait_for_die_give_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns wait_for_die_give_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): wait_for_die_give_card_toc;

    /**
     * Verifies a wait_for_die_give_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a wait_for_die_give_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns wait_for_die_give_card_toc
     */
    public static fromObject(object: { [k: string]: any }): wait_for_die_give_card_toc;

    /**
     * Creates a plain object from a wait_for_die_give_card_toc message. Also converts values to other types if specified.
     * @param message wait_for_die_give_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: wait_for_die_give_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this wait_for_die_give_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for wait_for_die_give_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a die_give_card_tos. */
export class die_give_card_tos implements Idie_give_card_tos {

    /**
     * Constructs a new die_give_card_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Idie_give_card_tos);

    /** die_give_card_tos targetPlayerId. */
    public targetPlayerId: number;

    /** die_give_card_tos cardId. */
    public cardId: number[];

    /** die_give_card_tos seq. */
    public seq: number;

    /**
     * Creates a new die_give_card_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns die_give_card_tos instance
     */
    public static create(properties?: Idie_give_card_tos): die_give_card_tos;

    /**
     * Encodes the specified die_give_card_tos message. Does not implicitly {@link die_give_card_tos.verify|verify} messages.
     * @param message die_give_card_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Idie_give_card_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified die_give_card_tos message, length delimited. Does not implicitly {@link die_give_card_tos.verify|verify} messages.
     * @param message die_give_card_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Idie_give_card_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a die_give_card_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns die_give_card_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): die_give_card_tos;

    /**
     * Decodes a die_give_card_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns die_give_card_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): die_give_card_tos;

    /**
     * Verifies a die_give_card_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a die_give_card_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns die_give_card_tos
     */
    public static fromObject(object: { [k: string]: any }): die_give_card_tos;

    /**
     * Creates a plain object from a die_give_card_tos message. Also converts values to other types if specified.
     * @param message die_give_card_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: die_give_card_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this die_give_card_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for die_give_card_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a notify_die_give_card_toc. */
export class notify_die_give_card_toc implements Inotify_die_give_card_toc {

    /**
     * Constructs a new notify_die_give_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Inotify_die_give_card_toc);

    /** notify_die_give_card_toc playerId. */
    public playerId: number;

    /** notify_die_give_card_toc targetPlayerId. */
    public targetPlayerId: number;

    /** notify_die_give_card_toc card. */
    public card: Icard[];

    /** notify_die_give_card_toc unknownCardCount. */
    public unknownCardCount: number;

    /**
     * Creates a new notify_die_give_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns notify_die_give_card_toc instance
     */
    public static create(properties?: Inotify_die_give_card_toc): notify_die_give_card_toc;

    /**
     * Encodes the specified notify_die_give_card_toc message. Does not implicitly {@link notify_die_give_card_toc.verify|verify} messages.
     * @param message notify_die_give_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Inotify_die_give_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified notify_die_give_card_toc message, length delimited. Does not implicitly {@link notify_die_give_card_toc.verify|verify} messages.
     * @param message notify_die_give_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Inotify_die_give_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a notify_die_give_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns notify_die_give_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): notify_die_give_card_toc;

    /**
     * Decodes a notify_die_give_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns notify_die_give_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): notify_die_give_card_toc;

    /**
     * Verifies a notify_die_give_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a notify_die_give_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns notify_die_give_card_toc
     */
    public static fromObject(object: { [k: string]: any }): notify_die_give_card_toc;

    /**
     * Creates a plain object from a notify_die_give_card_toc message. Also converts values to other types if specified.
     * @param message notify_die_give_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: notify_die_give_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this notify_die_give_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for notify_die_give_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_po_yi_tos. */
export class use_po_yi_tos implements Iuse_po_yi_tos {

    /**
     * Constructs a new use_po_yi_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_po_yi_tos);

    /** use_po_yi_tos cardId. */
    public cardId: number;

    /** use_po_yi_tos seq. */
    public seq: number;

    /**
     * Creates a new use_po_yi_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_po_yi_tos instance
     */
    public static create(properties?: Iuse_po_yi_tos): use_po_yi_tos;

    /**
     * Encodes the specified use_po_yi_tos message. Does not implicitly {@link use_po_yi_tos.verify|verify} messages.
     * @param message use_po_yi_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_po_yi_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_po_yi_tos message, length delimited. Does not implicitly {@link use_po_yi_tos.verify|verify} messages.
     * @param message use_po_yi_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_po_yi_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_po_yi_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_po_yi_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_po_yi_tos;

    /**
     * Decodes a use_po_yi_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_po_yi_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_po_yi_tos;

    /**
     * Verifies a use_po_yi_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_po_yi_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_po_yi_tos
     */
    public static fromObject(object: { [k: string]: any }): use_po_yi_tos;

    /**
     * Creates a plain object from a use_po_yi_tos message. Also converts values to other types if specified.
     * @param message use_po_yi_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_po_yi_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_po_yi_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_po_yi_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_po_yi_toc. */
export class use_po_yi_toc implements Iuse_po_yi_toc {

    /**
     * Constructs a new use_po_yi_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_po_yi_toc);

    /** use_po_yi_toc card. */
    public card?: (Icard|null);

    /** use_po_yi_toc playerId. */
    public playerId: number;

    /** use_po_yi_toc messageCard. */
    public messageCard?: (Icard|null);

    /** use_po_yi_toc waitingSecond. */
    public waitingSecond: number;

    /** use_po_yi_toc seq. */
    public seq: number;

    /**
     * Creates a new use_po_yi_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_po_yi_toc instance
     */
    public static create(properties?: Iuse_po_yi_toc): use_po_yi_toc;

    /**
     * Encodes the specified use_po_yi_toc message. Does not implicitly {@link use_po_yi_toc.verify|verify} messages.
     * @param message use_po_yi_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_po_yi_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_po_yi_toc message, length delimited. Does not implicitly {@link use_po_yi_toc.verify|verify} messages.
     * @param message use_po_yi_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_po_yi_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_po_yi_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_po_yi_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_po_yi_toc;

    /**
     * Decodes a use_po_yi_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_po_yi_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_po_yi_toc;

    /**
     * Verifies a use_po_yi_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_po_yi_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_po_yi_toc
     */
    public static fromObject(object: { [k: string]: any }): use_po_yi_toc;

    /**
     * Creates a plain object from a use_po_yi_toc message. Also converts values to other types if specified.
     * @param message use_po_yi_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_po_yi_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_po_yi_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_po_yi_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a po_yi_show_tos. */
export class po_yi_show_tos implements Ipo_yi_show_tos {

    /**
     * Constructs a new po_yi_show_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ipo_yi_show_tos);

    /** po_yi_show_tos show. */
    public show: boolean;

    /** po_yi_show_tos seq. */
    public seq: number;

    /**
     * Creates a new po_yi_show_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns po_yi_show_tos instance
     */
    public static create(properties?: Ipo_yi_show_tos): po_yi_show_tos;

    /**
     * Encodes the specified po_yi_show_tos message. Does not implicitly {@link po_yi_show_tos.verify|verify} messages.
     * @param message po_yi_show_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ipo_yi_show_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified po_yi_show_tos message, length delimited. Does not implicitly {@link po_yi_show_tos.verify|verify} messages.
     * @param message po_yi_show_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ipo_yi_show_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a po_yi_show_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns po_yi_show_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): po_yi_show_tos;

    /**
     * Decodes a po_yi_show_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns po_yi_show_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): po_yi_show_tos;

    /**
     * Verifies a po_yi_show_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a po_yi_show_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns po_yi_show_tos
     */
    public static fromObject(object: { [k: string]: any }): po_yi_show_tos;

    /**
     * Creates a plain object from a po_yi_show_tos message. Also converts values to other types if specified.
     * @param message po_yi_show_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: po_yi_show_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this po_yi_show_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for po_yi_show_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a po_yi_show_toc. */
export class po_yi_show_toc implements Ipo_yi_show_toc {

    /**
     * Constructs a new po_yi_show_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ipo_yi_show_toc);

    /** po_yi_show_toc playerId. */
    public playerId: number;

    /** po_yi_show_toc show. */
    public show: boolean;

    /** po_yi_show_toc messageCard. */
    public messageCard?: (Icard|null);

    /**
     * Creates a new po_yi_show_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns po_yi_show_toc instance
     */
    public static create(properties?: Ipo_yi_show_toc): po_yi_show_toc;

    /**
     * Encodes the specified po_yi_show_toc message. Does not implicitly {@link po_yi_show_toc.verify|verify} messages.
     * @param message po_yi_show_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ipo_yi_show_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified po_yi_show_toc message, length delimited. Does not implicitly {@link po_yi_show_toc.verify|verify} messages.
     * @param message po_yi_show_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ipo_yi_show_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a po_yi_show_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns po_yi_show_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): po_yi_show_toc;

    /**
     * Decodes a po_yi_show_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns po_yi_show_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): po_yi_show_toc;

    /**
     * Verifies a po_yi_show_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a po_yi_show_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns po_yi_show_toc
     */
    public static fromObject(object: { [k: string]: any }): po_yi_show_toc;

    /**
     * Creates a plain object from a po_yi_show_toc message. Also converts values to other types if specified.
     * @param message po_yi_show_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: po_yi_show_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this po_yi_show_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for po_yi_show_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_jie_huo_tos. */
export class use_jie_huo_tos implements Iuse_jie_huo_tos {

    /**
     * Constructs a new use_jie_huo_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_jie_huo_tos);

    /** use_jie_huo_tos cardId. */
    public cardId: number;

    /** use_jie_huo_tos seq. */
    public seq: number;

    /**
     * Creates a new use_jie_huo_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_jie_huo_tos instance
     */
    public static create(properties?: Iuse_jie_huo_tos): use_jie_huo_tos;

    /**
     * Encodes the specified use_jie_huo_tos message. Does not implicitly {@link use_jie_huo_tos.verify|verify} messages.
     * @param message use_jie_huo_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_jie_huo_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_jie_huo_tos message, length delimited. Does not implicitly {@link use_jie_huo_tos.verify|verify} messages.
     * @param message use_jie_huo_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_jie_huo_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_jie_huo_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_jie_huo_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_jie_huo_tos;

    /**
     * Decodes a use_jie_huo_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_jie_huo_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_jie_huo_tos;

    /**
     * Verifies a use_jie_huo_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_jie_huo_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_jie_huo_tos
     */
    public static fromObject(object: { [k: string]: any }): use_jie_huo_tos;

    /**
     * Creates a plain object from a use_jie_huo_tos message. Also converts values to other types if specified.
     * @param message use_jie_huo_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_jie_huo_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_jie_huo_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_jie_huo_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_jie_huo_toc. */
export class use_jie_huo_toc implements Iuse_jie_huo_toc {

    /**
     * Constructs a new use_jie_huo_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_jie_huo_toc);

    /** use_jie_huo_toc card. */
    public card?: (Icard|null);

    /** use_jie_huo_toc playerId. */
    public playerId: number;

    /**
     * Creates a new use_jie_huo_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_jie_huo_toc instance
     */
    public static create(properties?: Iuse_jie_huo_toc): use_jie_huo_toc;

    /**
     * Encodes the specified use_jie_huo_toc message. Does not implicitly {@link use_jie_huo_toc.verify|verify} messages.
     * @param message use_jie_huo_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_jie_huo_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_jie_huo_toc message, length delimited. Does not implicitly {@link use_jie_huo_toc.verify|verify} messages.
     * @param message use_jie_huo_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_jie_huo_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_jie_huo_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_jie_huo_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_jie_huo_toc;

    /**
     * Decodes a use_jie_huo_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_jie_huo_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_jie_huo_toc;

    /**
     * Verifies a use_jie_huo_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_jie_huo_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_jie_huo_toc
     */
    public static fromObject(object: { [k: string]: any }): use_jie_huo_toc;

    /**
     * Creates a plain object from a use_jie_huo_toc message. Also converts values to other types if specified.
     * @param message use_jie_huo_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_jie_huo_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_jie_huo_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_jie_huo_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_diao_bao_tos. */
export class use_diao_bao_tos implements Iuse_diao_bao_tos {

    /**
     * Constructs a new use_diao_bao_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_diao_bao_tos);

    /** use_diao_bao_tos cardId. */
    public cardId: number;

    /** use_diao_bao_tos seq. */
    public seq: number;

    /**
     * Creates a new use_diao_bao_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_diao_bao_tos instance
     */
    public static create(properties?: Iuse_diao_bao_tos): use_diao_bao_tos;

    /**
     * Encodes the specified use_diao_bao_tos message. Does not implicitly {@link use_diao_bao_tos.verify|verify} messages.
     * @param message use_diao_bao_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_diao_bao_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_diao_bao_tos message, length delimited. Does not implicitly {@link use_diao_bao_tos.verify|verify} messages.
     * @param message use_diao_bao_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_diao_bao_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_diao_bao_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_diao_bao_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_diao_bao_tos;

    /**
     * Decodes a use_diao_bao_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_diao_bao_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_diao_bao_tos;

    /**
     * Verifies a use_diao_bao_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_diao_bao_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_diao_bao_tos
     */
    public static fromObject(object: { [k: string]: any }): use_diao_bao_tos;

    /**
     * Creates a plain object from a use_diao_bao_tos message. Also converts values to other types if specified.
     * @param message use_diao_bao_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_diao_bao_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_diao_bao_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_diao_bao_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_diao_bao_toc. */
export class use_diao_bao_toc implements Iuse_diao_bao_toc {

    /**
     * Constructs a new use_diao_bao_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_diao_bao_toc);

    /** use_diao_bao_toc cardId. */
    public cardId: number;

    /** use_diao_bao_toc oldMessageCard. */
    public oldMessageCard?: (Icard|null);

    /** use_diao_bao_toc playerId. */
    public playerId: number;

    /**
     * Creates a new use_diao_bao_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_diao_bao_toc instance
     */
    public static create(properties?: Iuse_diao_bao_toc): use_diao_bao_toc;

    /**
     * Encodes the specified use_diao_bao_toc message. Does not implicitly {@link use_diao_bao_toc.verify|verify} messages.
     * @param message use_diao_bao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_diao_bao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_diao_bao_toc message, length delimited. Does not implicitly {@link use_diao_bao_toc.verify|verify} messages.
     * @param message use_diao_bao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_diao_bao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_diao_bao_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_diao_bao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_diao_bao_toc;

    /**
     * Decodes a use_diao_bao_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_diao_bao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_diao_bao_toc;

    /**
     * Verifies a use_diao_bao_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_diao_bao_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_diao_bao_toc
     */
    public static fromObject(object: { [k: string]: any }): use_diao_bao_toc;

    /**
     * Creates a plain object from a use_diao_bao_toc message. Also converts values to other types if specified.
     * @param message use_diao_bao_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_diao_bao_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_diao_bao_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_diao_bao_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_wu_dao_tos. */
export class use_wu_dao_tos implements Iuse_wu_dao_tos {

    /**
     * Constructs a new use_wu_dao_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_wu_dao_tos);

    /** use_wu_dao_tos cardId. */
    public cardId: number;

    /** use_wu_dao_tos targetPlayerId. */
    public targetPlayerId: number;

    /** use_wu_dao_tos seq. */
    public seq: number;

    /**
     * Creates a new use_wu_dao_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_wu_dao_tos instance
     */
    public static create(properties?: Iuse_wu_dao_tos): use_wu_dao_tos;

    /**
     * Encodes the specified use_wu_dao_tos message. Does not implicitly {@link use_wu_dao_tos.verify|verify} messages.
     * @param message use_wu_dao_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_wu_dao_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_wu_dao_tos message, length delimited. Does not implicitly {@link use_wu_dao_tos.verify|verify} messages.
     * @param message use_wu_dao_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_wu_dao_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_wu_dao_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_wu_dao_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_wu_dao_tos;

    /**
     * Decodes a use_wu_dao_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_wu_dao_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_wu_dao_tos;

    /**
     * Verifies a use_wu_dao_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_wu_dao_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_wu_dao_tos
     */
    public static fromObject(object: { [k: string]: any }): use_wu_dao_tos;

    /**
     * Creates a plain object from a use_wu_dao_tos message. Also converts values to other types if specified.
     * @param message use_wu_dao_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_wu_dao_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_wu_dao_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_wu_dao_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_wu_dao_toc. */
export class use_wu_dao_toc implements Iuse_wu_dao_toc {

    /**
     * Constructs a new use_wu_dao_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_wu_dao_toc);

    /** use_wu_dao_toc card. */
    public card?: (Icard|null);

    /** use_wu_dao_toc playerId. */
    public playerId: number;

    /** use_wu_dao_toc targetPlayerId. */
    public targetPlayerId: number;

    /**
     * Creates a new use_wu_dao_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_wu_dao_toc instance
     */
    public static create(properties?: Iuse_wu_dao_toc): use_wu_dao_toc;

    /**
     * Encodes the specified use_wu_dao_toc message. Does not implicitly {@link use_wu_dao_toc.verify|verify} messages.
     * @param message use_wu_dao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_wu_dao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_wu_dao_toc message, length delimited. Does not implicitly {@link use_wu_dao_toc.verify|verify} messages.
     * @param message use_wu_dao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_wu_dao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_wu_dao_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_wu_dao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_wu_dao_toc;

    /**
     * Decodes a use_wu_dao_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_wu_dao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_wu_dao_toc;

    /**
     * Verifies a use_wu_dao_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_wu_dao_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_wu_dao_toc
     */
    public static fromObject(object: { [k: string]: any }): use_wu_dao_toc;

    /**
     * Creates a plain object from a use_wu_dao_toc message. Also converts values to other types if specified.
     * @param message use_wu_dao_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_wu_dao_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_wu_dao_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_wu_dao_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an end_receive_phase_tos. */
export class end_receive_phase_tos implements Iend_receive_phase_tos {

    /**
     * Constructs a new end_receive_phase_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iend_receive_phase_tos);

    /** end_receive_phase_tos seq. */
    public seq: number;

    /**
     * Creates a new end_receive_phase_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns end_receive_phase_tos instance
     */
    public static create(properties?: Iend_receive_phase_tos): end_receive_phase_tos;

    /**
     * Encodes the specified end_receive_phase_tos message. Does not implicitly {@link end_receive_phase_tos.verify|verify} messages.
     * @param message end_receive_phase_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iend_receive_phase_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified end_receive_phase_tos message, length delimited. Does not implicitly {@link end_receive_phase_tos.verify|verify} messages.
     * @param message end_receive_phase_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iend_receive_phase_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an end_receive_phase_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns end_receive_phase_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): end_receive_phase_tos;

    /**
     * Decodes an end_receive_phase_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns end_receive_phase_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): end_receive_phase_tos;

    /**
     * Verifies an end_receive_phase_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an end_receive_phase_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns end_receive_phase_tos
     */
    public static fromObject(object: { [k: string]: any }): end_receive_phase_tos;

    /**
     * Creates a plain object from an end_receive_phase_tos message. Also converts values to other types if specified.
     * @param message end_receive_phase_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: end_receive_phase_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this end_receive_phase_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for end_receive_phase_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_feng_yun_bian_huan_tos. */
export class use_feng_yun_bian_huan_tos implements Iuse_feng_yun_bian_huan_tos {

    /**
     * Constructs a new use_feng_yun_bian_huan_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_feng_yun_bian_huan_tos);

    /** use_feng_yun_bian_huan_tos cardId. */
    public cardId: number;

    /** use_feng_yun_bian_huan_tos seq. */
    public seq: number;

    /**
     * Creates a new use_feng_yun_bian_huan_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_feng_yun_bian_huan_tos instance
     */
    public static create(properties?: Iuse_feng_yun_bian_huan_tos): use_feng_yun_bian_huan_tos;

    /**
     * Encodes the specified use_feng_yun_bian_huan_tos message. Does not implicitly {@link use_feng_yun_bian_huan_tos.verify|verify} messages.
     * @param message use_feng_yun_bian_huan_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_feng_yun_bian_huan_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_feng_yun_bian_huan_tos message, length delimited. Does not implicitly {@link use_feng_yun_bian_huan_tos.verify|verify} messages.
     * @param message use_feng_yun_bian_huan_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_feng_yun_bian_huan_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_feng_yun_bian_huan_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_feng_yun_bian_huan_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_feng_yun_bian_huan_tos;

    /**
     * Decodes a use_feng_yun_bian_huan_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_feng_yun_bian_huan_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_feng_yun_bian_huan_tos;

    /**
     * Verifies a use_feng_yun_bian_huan_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_feng_yun_bian_huan_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_feng_yun_bian_huan_tos
     */
    public static fromObject(object: { [k: string]: any }): use_feng_yun_bian_huan_tos;

    /**
     * Creates a plain object from a use_feng_yun_bian_huan_tos message. Also converts values to other types if specified.
     * @param message use_feng_yun_bian_huan_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_feng_yun_bian_huan_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_feng_yun_bian_huan_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_feng_yun_bian_huan_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a use_feng_yun_bian_huan_toc. */
export class use_feng_yun_bian_huan_toc implements Iuse_feng_yun_bian_huan_toc {

    /**
     * Constructs a new use_feng_yun_bian_huan_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuse_feng_yun_bian_huan_toc);

    /** use_feng_yun_bian_huan_toc card. */
    public card?: (Icard|null);

    /** use_feng_yun_bian_huan_toc playerId. */
    public playerId: number;

    /** use_feng_yun_bian_huan_toc showCards. */
    public showCards: Icard[];

    /**
     * Creates a new use_feng_yun_bian_huan_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns use_feng_yun_bian_huan_toc instance
     */
    public static create(properties?: Iuse_feng_yun_bian_huan_toc): use_feng_yun_bian_huan_toc;

    /**
     * Encodes the specified use_feng_yun_bian_huan_toc message. Does not implicitly {@link use_feng_yun_bian_huan_toc.verify|verify} messages.
     * @param message use_feng_yun_bian_huan_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuse_feng_yun_bian_huan_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified use_feng_yun_bian_huan_toc message, length delimited. Does not implicitly {@link use_feng_yun_bian_huan_toc.verify|verify} messages.
     * @param message use_feng_yun_bian_huan_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuse_feng_yun_bian_huan_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a use_feng_yun_bian_huan_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns use_feng_yun_bian_huan_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): use_feng_yun_bian_huan_toc;

    /**
     * Decodes a use_feng_yun_bian_huan_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns use_feng_yun_bian_huan_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): use_feng_yun_bian_huan_toc;

    /**
     * Verifies a use_feng_yun_bian_huan_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a use_feng_yun_bian_huan_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns use_feng_yun_bian_huan_toc
     */
    public static fromObject(object: { [k: string]: any }): use_feng_yun_bian_huan_toc;

    /**
     * Creates a plain object from a use_feng_yun_bian_huan_toc message. Also converts values to other types if specified.
     * @param message use_feng_yun_bian_huan_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: use_feng_yun_bian_huan_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this use_feng_yun_bian_huan_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for use_feng_yun_bian_huan_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a wait_for_feng_yun_bian_huan_choose_card_toc. */
export class wait_for_feng_yun_bian_huan_choose_card_toc implements Iwait_for_feng_yun_bian_huan_choose_card_toc {

    /**
     * Constructs a new wait_for_feng_yun_bian_huan_choose_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iwait_for_feng_yun_bian_huan_choose_card_toc);

    /** wait_for_feng_yun_bian_huan_choose_card_toc playerId. */
    public playerId: number;

    /** wait_for_feng_yun_bian_huan_choose_card_toc waitingSecond. */
    public waitingSecond: number;

    /** wait_for_feng_yun_bian_huan_choose_card_toc seq. */
    public seq: number;

    /**
     * Creates a new wait_for_feng_yun_bian_huan_choose_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns wait_for_feng_yun_bian_huan_choose_card_toc instance
     */
    public static create(properties?: Iwait_for_feng_yun_bian_huan_choose_card_toc): wait_for_feng_yun_bian_huan_choose_card_toc;

    /**
     * Encodes the specified wait_for_feng_yun_bian_huan_choose_card_toc message. Does not implicitly {@link wait_for_feng_yun_bian_huan_choose_card_toc.verify|verify} messages.
     * @param message wait_for_feng_yun_bian_huan_choose_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iwait_for_feng_yun_bian_huan_choose_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified wait_for_feng_yun_bian_huan_choose_card_toc message, length delimited. Does not implicitly {@link wait_for_feng_yun_bian_huan_choose_card_toc.verify|verify} messages.
     * @param message wait_for_feng_yun_bian_huan_choose_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iwait_for_feng_yun_bian_huan_choose_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a wait_for_feng_yun_bian_huan_choose_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns wait_for_feng_yun_bian_huan_choose_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): wait_for_feng_yun_bian_huan_choose_card_toc;

    /**
     * Decodes a wait_for_feng_yun_bian_huan_choose_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns wait_for_feng_yun_bian_huan_choose_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): wait_for_feng_yun_bian_huan_choose_card_toc;

    /**
     * Verifies a wait_for_feng_yun_bian_huan_choose_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a wait_for_feng_yun_bian_huan_choose_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns wait_for_feng_yun_bian_huan_choose_card_toc
     */
    public static fromObject(object: { [k: string]: any }): wait_for_feng_yun_bian_huan_choose_card_toc;

    /**
     * Creates a plain object from a wait_for_feng_yun_bian_huan_choose_card_toc message. Also converts values to other types if specified.
     * @param message wait_for_feng_yun_bian_huan_choose_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: wait_for_feng_yun_bian_huan_choose_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this wait_for_feng_yun_bian_huan_choose_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for wait_for_feng_yun_bian_huan_choose_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a feng_yun_bian_huan_choose_card_tos. */
export class feng_yun_bian_huan_choose_card_tos implements Ifeng_yun_bian_huan_choose_card_tos {

    /**
     * Constructs a new feng_yun_bian_huan_choose_card_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ifeng_yun_bian_huan_choose_card_tos);

    /** feng_yun_bian_huan_choose_card_tos cardId. */
    public cardId: number;

    /** feng_yun_bian_huan_choose_card_tos asMessageCard. */
    public asMessageCard: boolean;

    /** feng_yun_bian_huan_choose_card_tos seq. */
    public seq: number;

    /**
     * Creates a new feng_yun_bian_huan_choose_card_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns feng_yun_bian_huan_choose_card_tos instance
     */
    public static create(properties?: Ifeng_yun_bian_huan_choose_card_tos): feng_yun_bian_huan_choose_card_tos;

    /**
     * Encodes the specified feng_yun_bian_huan_choose_card_tos message. Does not implicitly {@link feng_yun_bian_huan_choose_card_tos.verify|verify} messages.
     * @param message feng_yun_bian_huan_choose_card_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ifeng_yun_bian_huan_choose_card_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified feng_yun_bian_huan_choose_card_tos message, length delimited. Does not implicitly {@link feng_yun_bian_huan_choose_card_tos.verify|verify} messages.
     * @param message feng_yun_bian_huan_choose_card_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ifeng_yun_bian_huan_choose_card_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a feng_yun_bian_huan_choose_card_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns feng_yun_bian_huan_choose_card_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): feng_yun_bian_huan_choose_card_tos;

    /**
     * Decodes a feng_yun_bian_huan_choose_card_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns feng_yun_bian_huan_choose_card_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): feng_yun_bian_huan_choose_card_tos;

    /**
     * Verifies a feng_yun_bian_huan_choose_card_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a feng_yun_bian_huan_choose_card_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns feng_yun_bian_huan_choose_card_tos
     */
    public static fromObject(object: { [k: string]: any }): feng_yun_bian_huan_choose_card_tos;

    /**
     * Creates a plain object from a feng_yun_bian_huan_choose_card_tos message. Also converts values to other types if specified.
     * @param message feng_yun_bian_huan_choose_card_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: feng_yun_bian_huan_choose_card_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this feng_yun_bian_huan_choose_card_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for feng_yun_bian_huan_choose_card_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a feng_yun_bian_huan_choose_card_toc. */
export class feng_yun_bian_huan_choose_card_toc implements Ifeng_yun_bian_huan_choose_card_toc {

    /**
     * Constructs a new feng_yun_bian_huan_choose_card_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ifeng_yun_bian_huan_choose_card_toc);

    /** feng_yun_bian_huan_choose_card_toc playerId. */
    public playerId: number;

    /** feng_yun_bian_huan_choose_card_toc cardId. */
    public cardId: number;

    /** feng_yun_bian_huan_choose_card_toc asMessageCard. */
    public asMessageCard: boolean;

    /**
     * Creates a new feng_yun_bian_huan_choose_card_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns feng_yun_bian_huan_choose_card_toc instance
     */
    public static create(properties?: Ifeng_yun_bian_huan_choose_card_toc): feng_yun_bian_huan_choose_card_toc;

    /**
     * Encodes the specified feng_yun_bian_huan_choose_card_toc message. Does not implicitly {@link feng_yun_bian_huan_choose_card_toc.verify|verify} messages.
     * @param message feng_yun_bian_huan_choose_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ifeng_yun_bian_huan_choose_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified feng_yun_bian_huan_choose_card_toc message, length delimited. Does not implicitly {@link feng_yun_bian_huan_choose_card_toc.verify|verify} messages.
     * @param message feng_yun_bian_huan_choose_card_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ifeng_yun_bian_huan_choose_card_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a feng_yun_bian_huan_choose_card_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns feng_yun_bian_huan_choose_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): feng_yun_bian_huan_choose_card_toc;

    /**
     * Decodes a feng_yun_bian_huan_choose_card_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns feng_yun_bian_huan_choose_card_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): feng_yun_bian_huan_choose_card_toc;

    /**
     * Verifies a feng_yun_bian_huan_choose_card_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a feng_yun_bian_huan_choose_card_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns feng_yun_bian_huan_choose_card_toc
     */
    public static fromObject(object: { [k: string]: any }): feng_yun_bian_huan_choose_card_toc;

    /**
     * Creates a plain object from a feng_yun_bian_huan_choose_card_toc message. Also converts values to other types if specified.
     * @param message feng_yun_bian_huan_choose_card_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: feng_yun_bian_huan_choose_card_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this feng_yun_bian_huan_choose_card_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for feng_yun_bian_huan_choose_card_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_qi_huo_ke_ju_tos. */
export class skill_qi_huo_ke_ju_tos implements Iskill_qi_huo_ke_ju_tos {

    /**
     * Constructs a new skill_qi_huo_ke_ju_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_qi_huo_ke_ju_tos);

    /** skill_qi_huo_ke_ju_tos cardId. */
    public cardId: number;

    /** skill_qi_huo_ke_ju_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_qi_huo_ke_ju_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_qi_huo_ke_ju_tos instance
     */
    public static create(properties?: Iskill_qi_huo_ke_ju_tos): skill_qi_huo_ke_ju_tos;

    /**
     * Encodes the specified skill_qi_huo_ke_ju_tos message. Does not implicitly {@link skill_qi_huo_ke_ju_tos.verify|verify} messages.
     * @param message skill_qi_huo_ke_ju_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_qi_huo_ke_ju_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_qi_huo_ke_ju_tos message, length delimited. Does not implicitly {@link skill_qi_huo_ke_ju_tos.verify|verify} messages.
     * @param message skill_qi_huo_ke_ju_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_qi_huo_ke_ju_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_qi_huo_ke_ju_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_qi_huo_ke_ju_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_qi_huo_ke_ju_tos;

    /**
     * Decodes a skill_qi_huo_ke_ju_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_qi_huo_ke_ju_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_qi_huo_ke_ju_tos;

    /**
     * Verifies a skill_qi_huo_ke_ju_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_qi_huo_ke_ju_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_qi_huo_ke_ju_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_qi_huo_ke_ju_tos;

    /**
     * Creates a plain object from a skill_qi_huo_ke_ju_tos message. Also converts values to other types if specified.
     * @param message skill_qi_huo_ke_ju_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_qi_huo_ke_ju_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_qi_huo_ke_ju_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_qi_huo_ke_ju_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_qi_huo_ke_ju_toc. */
export class skill_qi_huo_ke_ju_toc implements Iskill_qi_huo_ke_ju_toc {

    /**
     * Constructs a new skill_qi_huo_ke_ju_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_qi_huo_ke_ju_toc);

    /** skill_qi_huo_ke_ju_toc playerId. */
    public playerId: number;

    /** skill_qi_huo_ke_ju_toc cardId. */
    public cardId: number;

    /**
     * Creates a new skill_qi_huo_ke_ju_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_qi_huo_ke_ju_toc instance
     */
    public static create(properties?: Iskill_qi_huo_ke_ju_toc): skill_qi_huo_ke_ju_toc;

    /**
     * Encodes the specified skill_qi_huo_ke_ju_toc message. Does not implicitly {@link skill_qi_huo_ke_ju_toc.verify|verify} messages.
     * @param message skill_qi_huo_ke_ju_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_qi_huo_ke_ju_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_qi_huo_ke_ju_toc message, length delimited. Does not implicitly {@link skill_qi_huo_ke_ju_toc.verify|verify} messages.
     * @param message skill_qi_huo_ke_ju_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_qi_huo_ke_ju_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_qi_huo_ke_ju_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_qi_huo_ke_ju_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_qi_huo_ke_ju_toc;

    /**
     * Decodes a skill_qi_huo_ke_ju_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_qi_huo_ke_ju_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_qi_huo_ke_ju_toc;

    /**
     * Verifies a skill_qi_huo_ke_ju_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_qi_huo_ke_ju_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_qi_huo_ke_ju_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_qi_huo_ke_ju_toc;

    /**
     * Creates a plain object from a skill_qi_huo_ke_ju_toc message. Also converts values to other types if specified.
     * @param message skill_qi_huo_ke_ju_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_qi_huo_ke_ju_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_qi_huo_ke_ju_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_qi_huo_ke_ju_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_gui_zha_tos. */
export class skill_gui_zha_tos implements Iskill_gui_zha_tos {

    /**
     * Constructs a new skill_gui_zha_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_gui_zha_tos);

    /** skill_gui_zha_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_gui_zha_tos cardType. */
    public cardType: card_type;

    /** skill_gui_zha_tos wantType. */
    public wantType: card_type;

    /** skill_gui_zha_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_gui_zha_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_gui_zha_tos instance
     */
    public static create(properties?: Iskill_gui_zha_tos): skill_gui_zha_tos;

    /**
     * Encodes the specified skill_gui_zha_tos message. Does not implicitly {@link skill_gui_zha_tos.verify|verify} messages.
     * @param message skill_gui_zha_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_gui_zha_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_gui_zha_tos message, length delimited. Does not implicitly {@link skill_gui_zha_tos.verify|verify} messages.
     * @param message skill_gui_zha_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_gui_zha_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_gui_zha_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_gui_zha_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_gui_zha_tos;

    /**
     * Decodes a skill_gui_zha_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_gui_zha_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_gui_zha_tos;

    /**
     * Verifies a skill_gui_zha_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_gui_zha_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_gui_zha_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_gui_zha_tos;

    /**
     * Creates a plain object from a skill_gui_zha_tos message. Also converts values to other types if specified.
     * @param message skill_gui_zha_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_gui_zha_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_gui_zha_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_gui_zha_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_gui_zha_toc. */
export class skill_gui_zha_toc implements Iskill_gui_zha_toc {

    /**
     * Constructs a new skill_gui_zha_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_gui_zha_toc);

    /** skill_gui_zha_toc playerId. */
    public playerId: number;

    /** skill_gui_zha_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_gui_zha_toc cardType. */
    public cardType: card_type;

    /**
     * Creates a new skill_gui_zha_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_gui_zha_toc instance
     */
    public static create(properties?: Iskill_gui_zha_toc): skill_gui_zha_toc;

    /**
     * Encodes the specified skill_gui_zha_toc message. Does not implicitly {@link skill_gui_zha_toc.verify|verify} messages.
     * @param message skill_gui_zha_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_gui_zha_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_gui_zha_toc message, length delimited. Does not implicitly {@link skill_gui_zha_toc.verify|verify} messages.
     * @param message skill_gui_zha_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_gui_zha_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_gui_zha_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_gui_zha_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_gui_zha_toc;

    /**
     * Decodes a skill_gui_zha_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_gui_zha_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_gui_zha_toc;

    /**
     * Verifies a skill_gui_zha_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_gui_zha_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_gui_zha_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_gui_zha_toc;

    /**
     * Creates a plain object from a skill_gui_zha_toc message. Also converts values to other types if specified.
     * @param message skill_gui_zha_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_gui_zha_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_gui_zha_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_gui_zha_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_yi_ya_huan_ya_tos. */
export class skill_yi_ya_huan_ya_tos implements Iskill_yi_ya_huan_ya_tos {

    /**
     * Constructs a new skill_yi_ya_huan_ya_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_yi_ya_huan_ya_tos);

    /** skill_yi_ya_huan_ya_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_yi_ya_huan_ya_tos cardId. */
    public cardId: number;

    /** skill_yi_ya_huan_ya_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_yi_ya_huan_ya_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_yi_ya_huan_ya_tos instance
     */
    public static create(properties?: Iskill_yi_ya_huan_ya_tos): skill_yi_ya_huan_ya_tos;

    /**
     * Encodes the specified skill_yi_ya_huan_ya_tos message. Does not implicitly {@link skill_yi_ya_huan_ya_tos.verify|verify} messages.
     * @param message skill_yi_ya_huan_ya_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_yi_ya_huan_ya_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_yi_ya_huan_ya_tos message, length delimited. Does not implicitly {@link skill_yi_ya_huan_ya_tos.verify|verify} messages.
     * @param message skill_yi_ya_huan_ya_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_yi_ya_huan_ya_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_yi_ya_huan_ya_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_yi_ya_huan_ya_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_yi_ya_huan_ya_tos;

    /**
     * Decodes a skill_yi_ya_huan_ya_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_yi_ya_huan_ya_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_yi_ya_huan_ya_tos;

    /**
     * Verifies a skill_yi_ya_huan_ya_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_yi_ya_huan_ya_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_yi_ya_huan_ya_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_yi_ya_huan_ya_tos;

    /**
     * Creates a plain object from a skill_yi_ya_huan_ya_tos message. Also converts values to other types if specified.
     * @param message skill_yi_ya_huan_ya_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_yi_ya_huan_ya_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_yi_ya_huan_ya_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_yi_ya_huan_ya_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_yi_ya_huan_ya_toc. */
export class skill_yi_ya_huan_ya_toc implements Iskill_yi_ya_huan_ya_toc {

    /**
     * Constructs a new skill_yi_ya_huan_ya_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_yi_ya_huan_ya_toc);

    /** skill_yi_ya_huan_ya_toc playerId. */
    public playerId: number;

    /** skill_yi_ya_huan_ya_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_yi_ya_huan_ya_toc card. */
    public card?: (Icard|null);

    /**
     * Creates a new skill_yi_ya_huan_ya_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_yi_ya_huan_ya_toc instance
     */
    public static create(properties?: Iskill_yi_ya_huan_ya_toc): skill_yi_ya_huan_ya_toc;

    /**
     * Encodes the specified skill_yi_ya_huan_ya_toc message. Does not implicitly {@link skill_yi_ya_huan_ya_toc.verify|verify} messages.
     * @param message skill_yi_ya_huan_ya_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_yi_ya_huan_ya_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_yi_ya_huan_ya_toc message, length delimited. Does not implicitly {@link skill_yi_ya_huan_ya_toc.verify|verify} messages.
     * @param message skill_yi_ya_huan_ya_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_yi_ya_huan_ya_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_yi_ya_huan_ya_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_yi_ya_huan_ya_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_yi_ya_huan_ya_toc;

    /**
     * Decodes a skill_yi_ya_huan_ya_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_yi_ya_huan_ya_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_yi_ya_huan_ya_toc;

    /**
     * Verifies a skill_yi_ya_huan_ya_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_yi_ya_huan_ya_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_yi_ya_huan_ya_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_yi_ya_huan_ya_toc;

    /**
     * Creates a plain object from a skill_yi_ya_huan_ya_toc message. Also converts values to other types if specified.
     * @param message skill_yi_ya_huan_ya_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_yi_ya_huan_ya_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_yi_ya_huan_ya_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_yi_ya_huan_ya_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_yi_hua_jie_mu_tos. */
export class skill_yi_hua_jie_mu_tos implements Iskill_yi_hua_jie_mu_tos {

    /**
     * Constructs a new skill_yi_hua_jie_mu_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_yi_hua_jie_mu_tos);

    /** skill_yi_hua_jie_mu_tos fromPlayerId. */
    public fromPlayerId: number;

    /** skill_yi_hua_jie_mu_tos cardId. */
    public cardId: number;

    /** skill_yi_hua_jie_mu_tos toPlayerId. */
    public toPlayerId: number;

    /** skill_yi_hua_jie_mu_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_yi_hua_jie_mu_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_yi_hua_jie_mu_tos instance
     */
    public static create(properties?: Iskill_yi_hua_jie_mu_tos): skill_yi_hua_jie_mu_tos;

    /**
     * Encodes the specified skill_yi_hua_jie_mu_tos message. Does not implicitly {@link skill_yi_hua_jie_mu_tos.verify|verify} messages.
     * @param message skill_yi_hua_jie_mu_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_yi_hua_jie_mu_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_yi_hua_jie_mu_tos message, length delimited. Does not implicitly {@link skill_yi_hua_jie_mu_tos.verify|verify} messages.
     * @param message skill_yi_hua_jie_mu_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_yi_hua_jie_mu_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_yi_hua_jie_mu_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_yi_hua_jie_mu_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_yi_hua_jie_mu_tos;

    /**
     * Decodes a skill_yi_hua_jie_mu_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_yi_hua_jie_mu_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_yi_hua_jie_mu_tos;

    /**
     * Verifies a skill_yi_hua_jie_mu_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_yi_hua_jie_mu_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_yi_hua_jie_mu_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_yi_hua_jie_mu_tos;

    /**
     * Creates a plain object from a skill_yi_hua_jie_mu_tos message. Also converts values to other types if specified.
     * @param message skill_yi_hua_jie_mu_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_yi_hua_jie_mu_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_yi_hua_jie_mu_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_yi_hua_jie_mu_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_yi_hua_jie_mu_toc. */
export class skill_yi_hua_jie_mu_toc implements Iskill_yi_hua_jie_mu_toc {

    /**
     * Constructs a new skill_yi_hua_jie_mu_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_yi_hua_jie_mu_toc);

    /** skill_yi_hua_jie_mu_toc playerId. */
    public playerId: number;

    /** skill_yi_hua_jie_mu_toc fromPlayerId. */
    public fromPlayerId: number;

    /** skill_yi_hua_jie_mu_toc cardId. */
    public cardId: number;

    /** skill_yi_hua_jie_mu_toc toPlayerId. */
    public toPlayerId: number;

    /** skill_yi_hua_jie_mu_toc joinIntoHand. */
    public joinIntoHand: boolean;

    /**
     * Creates a new skill_yi_hua_jie_mu_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_yi_hua_jie_mu_toc instance
     */
    public static create(properties?: Iskill_yi_hua_jie_mu_toc): skill_yi_hua_jie_mu_toc;

    /**
     * Encodes the specified skill_yi_hua_jie_mu_toc message. Does not implicitly {@link skill_yi_hua_jie_mu_toc.verify|verify} messages.
     * @param message skill_yi_hua_jie_mu_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_yi_hua_jie_mu_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_yi_hua_jie_mu_toc message, length delimited. Does not implicitly {@link skill_yi_hua_jie_mu_toc.verify|verify} messages.
     * @param message skill_yi_hua_jie_mu_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_yi_hua_jie_mu_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_yi_hua_jie_mu_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_yi_hua_jie_mu_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_yi_hua_jie_mu_toc;

    /**
     * Decodes a skill_yi_hua_jie_mu_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_yi_hua_jie_mu_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_yi_hua_jie_mu_toc;

    /**
     * Verifies a skill_yi_hua_jie_mu_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_yi_hua_jie_mu_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_yi_hua_jie_mu_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_yi_hua_jie_mu_toc;

    /**
     * Creates a plain object from a skill_yi_hua_jie_mu_toc message. Also converts values to other types if specified.
     * @param message skill_yi_hua_jie_mu_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_yi_hua_jie_mu_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_yi_hua_jie_mu_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_yi_hua_jie_mu_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_tou_tian_tos. */
export class skill_tou_tian_tos implements Iskill_tou_tian_tos {

    /**
     * Constructs a new skill_tou_tian_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_tou_tian_tos);

    /** skill_tou_tian_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_tou_tian_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_tou_tian_tos instance
     */
    public static create(properties?: Iskill_tou_tian_tos): skill_tou_tian_tos;

    /**
     * Encodes the specified skill_tou_tian_tos message. Does not implicitly {@link skill_tou_tian_tos.verify|verify} messages.
     * @param message skill_tou_tian_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_tou_tian_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_tou_tian_tos message, length delimited. Does not implicitly {@link skill_tou_tian_tos.verify|verify} messages.
     * @param message skill_tou_tian_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_tou_tian_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_tou_tian_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_tou_tian_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_tou_tian_tos;

    /**
     * Decodes a skill_tou_tian_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_tou_tian_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_tou_tian_tos;

    /**
     * Verifies a skill_tou_tian_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_tou_tian_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_tou_tian_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_tou_tian_tos;

    /**
     * Creates a plain object from a skill_tou_tian_tos message. Also converts values to other types if specified.
     * @param message skill_tou_tian_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_tou_tian_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_tou_tian_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_tou_tian_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_tou_tian_toc. */
export class skill_tou_tian_toc implements Iskill_tou_tian_toc {

    /**
     * Constructs a new skill_tou_tian_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_tou_tian_toc);

    /** skill_tou_tian_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_tou_tian_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_tou_tian_toc instance
     */
    public static create(properties?: Iskill_tou_tian_toc): skill_tou_tian_toc;

    /**
     * Encodes the specified skill_tou_tian_toc message. Does not implicitly {@link skill_tou_tian_toc.verify|verify} messages.
     * @param message skill_tou_tian_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_tou_tian_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_tou_tian_toc message, length delimited. Does not implicitly {@link skill_tou_tian_toc.verify|verify} messages.
     * @param message skill_tou_tian_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_tou_tian_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_tou_tian_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_tou_tian_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_tou_tian_toc;

    /**
     * Decodes a skill_tou_tian_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_tou_tian_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_tou_tian_toc;

    /**
     * Verifies a skill_tou_tian_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_tou_tian_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_tou_tian_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_tou_tian_toc;

    /**
     * Creates a plain object from a skill_tou_tian_toc message. Also converts values to other types if specified.
     * @param message skill_tou_tian_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_tou_tian_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_tou_tian_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_tou_tian_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_huan_ri_toc. */
export class skill_huan_ri_toc implements Iskill_huan_ri_toc {

    /**
     * Constructs a new skill_huan_ri_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_huan_ri_toc);

    /** skill_huan_ri_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_huan_ri_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_huan_ri_toc instance
     */
    public static create(properties?: Iskill_huan_ri_toc): skill_huan_ri_toc;

    /**
     * Encodes the specified skill_huan_ri_toc message. Does not implicitly {@link skill_huan_ri_toc.verify|verify} messages.
     * @param message skill_huan_ri_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_huan_ri_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_huan_ri_toc message, length delimited. Does not implicitly {@link skill_huan_ri_toc.verify|verify} messages.
     * @param message skill_huan_ri_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_huan_ri_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_huan_ri_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_huan_ri_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_huan_ri_toc;

    /**
     * Decodes a skill_huan_ri_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_huan_ri_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_huan_ri_toc;

    /**
     * Verifies a skill_huan_ri_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_huan_ri_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_huan_ri_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_huan_ri_toc;

    /**
     * Creates a plain object from a skill_huan_ri_toc message. Also converts values to other types if specified.
     * @param message skill_huan_ri_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_huan_ri_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_huan_ri_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_huan_ri_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ji_song_tos. */
export class skill_ji_song_tos implements Iskill_ji_song_tos {

    /**
     * Constructs a new skill_ji_song_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ji_song_tos);

    /** skill_ji_song_tos cardIds. */
    public cardIds: number[];

    /** skill_ji_song_tos messageCard. */
    public messageCard: number;

    /** skill_ji_song_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_ji_song_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_ji_song_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ji_song_tos instance
     */
    public static create(properties?: Iskill_ji_song_tos): skill_ji_song_tos;

    /**
     * Encodes the specified skill_ji_song_tos message. Does not implicitly {@link skill_ji_song_tos.verify|verify} messages.
     * @param message skill_ji_song_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ji_song_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ji_song_tos message, length delimited. Does not implicitly {@link skill_ji_song_tos.verify|verify} messages.
     * @param message skill_ji_song_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ji_song_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ji_song_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ji_song_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ji_song_tos;

    /**
     * Decodes a skill_ji_song_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ji_song_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ji_song_tos;

    /**
     * Verifies a skill_ji_song_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ji_song_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ji_song_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_ji_song_tos;

    /**
     * Creates a plain object from a skill_ji_song_tos message. Also converts values to other types if specified.
     * @param message skill_ji_song_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ji_song_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ji_song_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ji_song_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ji_song_toc. */
export class skill_ji_song_toc implements Iskill_ji_song_toc {

    /**
     * Constructs a new skill_ji_song_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ji_song_toc);

    /** skill_ji_song_toc playerId. */
    public playerId: number;

    /** skill_ji_song_toc messageCard. */
    public messageCard?: (Icard|null);

    /** skill_ji_song_toc targetPlayerId. */
    public targetPlayerId: number;

    /**
     * Creates a new skill_ji_song_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ji_song_toc instance
     */
    public static create(properties?: Iskill_ji_song_toc): skill_ji_song_toc;

    /**
     * Encodes the specified skill_ji_song_toc message. Does not implicitly {@link skill_ji_song_toc.verify|verify} messages.
     * @param message skill_ji_song_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ji_song_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ji_song_toc message, length delimited. Does not implicitly {@link skill_ji_song_toc.verify|verify} messages.
     * @param message skill_ji_song_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ji_song_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ji_song_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ji_song_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ji_song_toc;

    /**
     * Decodes a skill_ji_song_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ji_song_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ji_song_toc;

    /**
     * Verifies a skill_ji_song_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ji_song_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ji_song_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_ji_song_toc;

    /**
     * Creates a plain object from a skill_ji_song_toc message. Also converts values to other types if specified.
     * @param message skill_ji_song_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ji_song_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ji_song_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ji_song_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_mian_li_cang_zhen_tos. */
export class skill_mian_li_cang_zhen_tos implements Iskill_mian_li_cang_zhen_tos {

    /**
     * Constructs a new skill_mian_li_cang_zhen_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_mian_li_cang_zhen_tos);

    /** skill_mian_li_cang_zhen_tos cardId. */
    public cardId: number;

    /** skill_mian_li_cang_zhen_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_mian_li_cang_zhen_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_mian_li_cang_zhen_tos instance
     */
    public static create(properties?: Iskill_mian_li_cang_zhen_tos): skill_mian_li_cang_zhen_tos;

    /**
     * Encodes the specified skill_mian_li_cang_zhen_tos message. Does not implicitly {@link skill_mian_li_cang_zhen_tos.verify|verify} messages.
     * @param message skill_mian_li_cang_zhen_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_mian_li_cang_zhen_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_mian_li_cang_zhen_tos message, length delimited. Does not implicitly {@link skill_mian_li_cang_zhen_tos.verify|verify} messages.
     * @param message skill_mian_li_cang_zhen_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_mian_li_cang_zhen_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_mian_li_cang_zhen_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_mian_li_cang_zhen_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_mian_li_cang_zhen_tos;

    /**
     * Decodes a skill_mian_li_cang_zhen_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_mian_li_cang_zhen_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_mian_li_cang_zhen_tos;

    /**
     * Verifies a skill_mian_li_cang_zhen_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_mian_li_cang_zhen_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_mian_li_cang_zhen_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_mian_li_cang_zhen_tos;

    /**
     * Creates a plain object from a skill_mian_li_cang_zhen_tos message. Also converts values to other types if specified.
     * @param message skill_mian_li_cang_zhen_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_mian_li_cang_zhen_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_mian_li_cang_zhen_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_mian_li_cang_zhen_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_mian_li_cang_zhen_toc. */
export class skill_mian_li_cang_zhen_toc implements Iskill_mian_li_cang_zhen_toc {

    /**
     * Constructs a new skill_mian_li_cang_zhen_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_mian_li_cang_zhen_toc);

    /** skill_mian_li_cang_zhen_toc playerId. */
    public playerId: number;

    /** skill_mian_li_cang_zhen_toc card. */
    public card?: (Icard|null);

    /** skill_mian_li_cang_zhen_toc targetPlayerId. */
    public targetPlayerId: number;

    /**
     * Creates a new skill_mian_li_cang_zhen_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_mian_li_cang_zhen_toc instance
     */
    public static create(properties?: Iskill_mian_li_cang_zhen_toc): skill_mian_li_cang_zhen_toc;

    /**
     * Encodes the specified skill_mian_li_cang_zhen_toc message. Does not implicitly {@link skill_mian_li_cang_zhen_toc.verify|verify} messages.
     * @param message skill_mian_li_cang_zhen_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_mian_li_cang_zhen_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_mian_li_cang_zhen_toc message, length delimited. Does not implicitly {@link skill_mian_li_cang_zhen_toc.verify|verify} messages.
     * @param message skill_mian_li_cang_zhen_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_mian_li_cang_zhen_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_mian_li_cang_zhen_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_mian_li_cang_zhen_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_mian_li_cang_zhen_toc;

    /**
     * Decodes a skill_mian_li_cang_zhen_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_mian_li_cang_zhen_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_mian_li_cang_zhen_toc;

    /**
     * Verifies a skill_mian_li_cang_zhen_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_mian_li_cang_zhen_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_mian_li_cang_zhen_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_mian_li_cang_zhen_toc;

    /**
     * Creates a plain object from a skill_mian_li_cang_zhen_toc message. Also converts values to other types if specified.
     * @param message skill_mian_li_cang_zhen_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_mian_li_cang_zhen_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_mian_li_cang_zhen_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_mian_li_cang_zhen_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_shen_tos. */
export class skill_jin_shen_tos implements Iskill_jin_shen_tos {

    /**
     * Constructs a new skill_jin_shen_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_shen_tos);

    /** skill_jin_shen_tos cardId. */
    public cardId: number;

    /** skill_jin_shen_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jin_shen_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_shen_tos instance
     */
    public static create(properties?: Iskill_jin_shen_tos): skill_jin_shen_tos;

    /**
     * Encodes the specified skill_jin_shen_tos message. Does not implicitly {@link skill_jin_shen_tos.verify|verify} messages.
     * @param message skill_jin_shen_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_shen_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_shen_tos message, length delimited. Does not implicitly {@link skill_jin_shen_tos.verify|verify} messages.
     * @param message skill_jin_shen_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_shen_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_shen_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_shen_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_shen_tos;

    /**
     * Decodes a skill_jin_shen_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_shen_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_shen_tos;

    /**
     * Verifies a skill_jin_shen_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_shen_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_shen_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_shen_tos;

    /**
     * Creates a plain object from a skill_jin_shen_tos message. Also converts values to other types if specified.
     * @param message skill_jin_shen_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_shen_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_shen_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_shen_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_shen_toc. */
export class skill_jin_shen_toc implements Iskill_jin_shen_toc {

    /**
     * Constructs a new skill_jin_shen_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_shen_toc);

    /** skill_jin_shen_toc playerId. */
    public playerId: number;

    /** skill_jin_shen_toc card. */
    public card?: (Icard|null);

    /**
     * Creates a new skill_jin_shen_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_shen_toc instance
     */
    public static create(properties?: Iskill_jin_shen_toc): skill_jin_shen_toc;

    /**
     * Encodes the specified skill_jin_shen_toc message. Does not implicitly {@link skill_jin_shen_toc.verify|verify} messages.
     * @param message skill_jin_shen_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_shen_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_shen_toc message, length delimited. Does not implicitly {@link skill_jin_shen_toc.verify|verify} messages.
     * @param message skill_jin_shen_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_shen_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_shen_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_shen_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_shen_toc;

    /**
     * Decodes a skill_jin_shen_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_shen_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_shen_toc;

    /**
     * Verifies a skill_jin_shen_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_shen_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_shen_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_shen_toc;

    /**
     * Creates a plain object from a skill_jin_shen_toc message. Also converts values to other types if specified.
     * @param message skill_jin_shen_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_shen_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_shen_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_shen_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_lian_min_tos. */
export class skill_lian_min_tos implements Iskill_lian_min_tos {

    /**
     * Constructs a new skill_lian_min_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_lian_min_tos);

    /** skill_lian_min_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_lian_min_tos cardId. */
    public cardId: number;

    /** skill_lian_min_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_lian_min_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_lian_min_tos instance
     */
    public static create(properties?: Iskill_lian_min_tos): skill_lian_min_tos;

    /**
     * Encodes the specified skill_lian_min_tos message. Does not implicitly {@link skill_lian_min_tos.verify|verify} messages.
     * @param message skill_lian_min_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_lian_min_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_lian_min_tos message, length delimited. Does not implicitly {@link skill_lian_min_tos.verify|verify} messages.
     * @param message skill_lian_min_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_lian_min_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_lian_min_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_lian_min_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_lian_min_tos;

    /**
     * Decodes a skill_lian_min_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_lian_min_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_lian_min_tos;

    /**
     * Verifies a skill_lian_min_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_lian_min_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_lian_min_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_lian_min_tos;

    /**
     * Creates a plain object from a skill_lian_min_tos message. Also converts values to other types if specified.
     * @param message skill_lian_min_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_lian_min_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_lian_min_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_lian_min_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_lian_min_toc. */
export class skill_lian_min_toc implements Iskill_lian_min_toc {

    /**
     * Constructs a new skill_lian_min_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_lian_min_toc);

    /** skill_lian_min_toc playerId. */
    public playerId: number;

    /** skill_lian_min_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_lian_min_toc cardId. */
    public cardId: number;

    /**
     * Creates a new skill_lian_min_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_lian_min_toc instance
     */
    public static create(properties?: Iskill_lian_min_toc): skill_lian_min_toc;

    /**
     * Encodes the specified skill_lian_min_toc message. Does not implicitly {@link skill_lian_min_toc.verify|verify} messages.
     * @param message skill_lian_min_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_lian_min_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_lian_min_toc message, length delimited. Does not implicitly {@link skill_lian_min_toc.verify|verify} messages.
     * @param message skill_lian_min_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_lian_min_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_lian_min_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_lian_min_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_lian_min_toc;

    /**
     * Decodes a skill_lian_min_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_lian_min_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_lian_min_toc;

    /**
     * Verifies a skill_lian_min_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_lian_min_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_lian_min_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_lian_min_toc;

    /**
     * Creates a plain object from a skill_lian_min_toc message. Also converts values to other types if specified.
     * @param message skill_lian_min_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_lian_min_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_lian_min_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_lian_min_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_fu_hei_toc. */
export class skill_fu_hei_toc implements Iskill_fu_hei_toc {

    /**
     * Constructs a new skill_fu_hei_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_fu_hei_toc);

    /** skill_fu_hei_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_fu_hei_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_fu_hei_toc instance
     */
    public static create(properties?: Iskill_fu_hei_toc): skill_fu_hei_toc;

    /**
     * Encodes the specified skill_fu_hei_toc message. Does not implicitly {@link skill_fu_hei_toc.verify|verify} messages.
     * @param message skill_fu_hei_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_fu_hei_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_fu_hei_toc message, length delimited. Does not implicitly {@link skill_fu_hei_toc.verify|verify} messages.
     * @param message skill_fu_hei_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_fu_hei_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_fu_hei_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_fu_hei_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_fu_hei_toc;

    /**
     * Decodes a skill_fu_hei_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_fu_hei_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_fu_hei_toc;

    /**
     * Verifies a skill_fu_hei_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_fu_hei_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_fu_hei_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_fu_hei_toc;

    /**
     * Creates a plain object from a skill_fu_hei_toc message. Also converts values to other types if specified.
     * @param message skill_fu_hei_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_fu_hei_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_fu_hei_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_fu_hei_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_xin_si_chao_tos. */
export class skill_xin_si_chao_tos implements Iskill_xin_si_chao_tos {

    /**
     * Constructs a new skill_xin_si_chao_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_xin_si_chao_tos);

    /** skill_xin_si_chao_tos cardId. */
    public cardId: number;

    /** skill_xin_si_chao_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_xin_si_chao_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_xin_si_chao_tos instance
     */
    public static create(properties?: Iskill_xin_si_chao_tos): skill_xin_si_chao_tos;

    /**
     * Encodes the specified skill_xin_si_chao_tos message. Does not implicitly {@link skill_xin_si_chao_tos.verify|verify} messages.
     * @param message skill_xin_si_chao_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_xin_si_chao_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_xin_si_chao_tos message, length delimited. Does not implicitly {@link skill_xin_si_chao_tos.verify|verify} messages.
     * @param message skill_xin_si_chao_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_xin_si_chao_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_xin_si_chao_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_xin_si_chao_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_xin_si_chao_tos;

    /**
     * Decodes a skill_xin_si_chao_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_xin_si_chao_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_xin_si_chao_tos;

    /**
     * Verifies a skill_xin_si_chao_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_xin_si_chao_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_xin_si_chao_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_xin_si_chao_tos;

    /**
     * Creates a plain object from a skill_xin_si_chao_tos message. Also converts values to other types if specified.
     * @param message skill_xin_si_chao_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_xin_si_chao_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_xin_si_chao_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_xin_si_chao_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_xin_si_chao_toc. */
export class skill_xin_si_chao_toc implements Iskill_xin_si_chao_toc {

    /**
     * Constructs a new skill_xin_si_chao_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_xin_si_chao_toc);

    /** skill_xin_si_chao_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_xin_si_chao_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_xin_si_chao_toc instance
     */
    public static create(properties?: Iskill_xin_si_chao_toc): skill_xin_si_chao_toc;

    /**
     * Encodes the specified skill_xin_si_chao_toc message. Does not implicitly {@link skill_xin_si_chao_toc.verify|verify} messages.
     * @param message skill_xin_si_chao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_xin_si_chao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_xin_si_chao_toc message, length delimited. Does not implicitly {@link skill_xin_si_chao_toc.verify|verify} messages.
     * @param message skill_xin_si_chao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_xin_si_chao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_xin_si_chao_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_xin_si_chao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_xin_si_chao_toc;

    /**
     * Decodes a skill_xin_si_chao_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_xin_si_chao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_xin_si_chao_toc;

    /**
     * Verifies a skill_xin_si_chao_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_xin_si_chao_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_xin_si_chao_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_xin_si_chao_toc;

    /**
     * Creates a plain object from a skill_xin_si_chao_toc message. Also converts values to other types if specified.
     * @param message skill_xin_si_chao_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_xin_si_chao_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_xin_si_chao_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_xin_si_chao_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_shi_si_toc. */
export class skill_shi_si_toc implements Iskill_shi_si_toc {

    /**
     * Constructs a new skill_shi_si_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_shi_si_toc);

    /** skill_shi_si_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_shi_si_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_shi_si_toc instance
     */
    public static create(properties?: Iskill_shi_si_toc): skill_shi_si_toc;

    /**
     * Encodes the specified skill_shi_si_toc message. Does not implicitly {@link skill_shi_si_toc.verify|verify} messages.
     * @param message skill_shi_si_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_shi_si_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_shi_si_toc message, length delimited. Does not implicitly {@link skill_shi_si_toc.verify|verify} messages.
     * @param message skill_shi_si_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_shi_si_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_shi_si_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_shi_si_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_shi_si_toc;

    /**
     * Decodes a skill_shi_si_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_shi_si_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_shi_si_toc;

    /**
     * Verifies a skill_shi_si_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_shi_si_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_shi_si_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_shi_si_toc;

    /**
     * Creates a plain object from a skill_shi_si_toc message. Also converts values to other types if specified.
     * @param message skill_shi_si_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_shi_si_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_shi_si_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_shi_si_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_ru_gui_toc. */
export class skill_wait_for_ru_gui_toc implements Iskill_wait_for_ru_gui_toc {

    /**
     * Constructs a new skill_wait_for_ru_gui_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_ru_gui_toc);

    /** skill_wait_for_ru_gui_toc playerId. */
    public playerId: number;

    /** skill_wait_for_ru_gui_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_ru_gui_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_ru_gui_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_ru_gui_toc instance
     */
    public static create(properties?: Iskill_wait_for_ru_gui_toc): skill_wait_for_ru_gui_toc;

    /**
     * Encodes the specified skill_wait_for_ru_gui_toc message. Does not implicitly {@link skill_wait_for_ru_gui_toc.verify|verify} messages.
     * @param message skill_wait_for_ru_gui_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_ru_gui_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_ru_gui_toc message, length delimited. Does not implicitly {@link skill_wait_for_ru_gui_toc.verify|verify} messages.
     * @param message skill_wait_for_ru_gui_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_ru_gui_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_ru_gui_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_ru_gui_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_ru_gui_toc;

    /**
     * Decodes a skill_wait_for_ru_gui_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_ru_gui_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_ru_gui_toc;

    /**
     * Verifies a skill_wait_for_ru_gui_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_ru_gui_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_ru_gui_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_ru_gui_toc;

    /**
     * Creates a plain object from a skill_wait_for_ru_gui_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_ru_gui_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_ru_gui_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_ru_gui_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_ru_gui_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ru_gui_tos. */
export class skill_ru_gui_tos implements Iskill_ru_gui_tos {

    /**
     * Constructs a new skill_ru_gui_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ru_gui_tos);

    /** skill_ru_gui_tos enable. */
    public enable: boolean;

    /** skill_ru_gui_tos cardId. */
    public cardId: number;

    /** skill_ru_gui_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_ru_gui_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ru_gui_tos instance
     */
    public static create(properties?: Iskill_ru_gui_tos): skill_ru_gui_tos;

    /**
     * Encodes the specified skill_ru_gui_tos message. Does not implicitly {@link skill_ru_gui_tos.verify|verify} messages.
     * @param message skill_ru_gui_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ru_gui_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ru_gui_tos message, length delimited. Does not implicitly {@link skill_ru_gui_tos.verify|verify} messages.
     * @param message skill_ru_gui_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ru_gui_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ru_gui_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ru_gui_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ru_gui_tos;

    /**
     * Decodes a skill_ru_gui_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ru_gui_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ru_gui_tos;

    /**
     * Verifies a skill_ru_gui_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ru_gui_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ru_gui_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_ru_gui_tos;

    /**
     * Creates a plain object from a skill_ru_gui_tos message. Also converts values to other types if specified.
     * @param message skill_ru_gui_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ru_gui_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ru_gui_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ru_gui_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ru_gui_toc. */
export class skill_ru_gui_toc implements Iskill_ru_gui_toc {

    /**
     * Constructs a new skill_ru_gui_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ru_gui_toc);

    /** skill_ru_gui_toc playerId. */
    public playerId: number;

    /** skill_ru_gui_toc cardId. */
    public cardId: number;

    /** skill_ru_gui_toc enable. */
    public enable: boolean;

    /**
     * Creates a new skill_ru_gui_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ru_gui_toc instance
     */
    public static create(properties?: Iskill_ru_gui_toc): skill_ru_gui_toc;

    /**
     * Encodes the specified skill_ru_gui_toc message. Does not implicitly {@link skill_ru_gui_toc.verify|verify} messages.
     * @param message skill_ru_gui_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ru_gui_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ru_gui_toc message, length delimited. Does not implicitly {@link skill_ru_gui_toc.verify|verify} messages.
     * @param message skill_ru_gui_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ru_gui_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ru_gui_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ru_gui_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ru_gui_toc;

    /**
     * Decodes a skill_ru_gui_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ru_gui_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ru_gui_toc;

    /**
     * Verifies a skill_ru_gui_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ru_gui_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ru_gui_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_ru_gui_toc;

    /**
     * Creates a plain object from a skill_ru_gui_toc message. Also converts values to other types if specified.
     * @param message skill_ru_gui_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ru_gui_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ru_gui_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ru_gui_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_zhuan_jiao_toc. */
export class skill_wait_for_zhuan_jiao_toc implements Iskill_wait_for_zhuan_jiao_toc {

    /**
     * Constructs a new skill_wait_for_zhuan_jiao_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_zhuan_jiao_toc);

    /** skill_wait_for_zhuan_jiao_toc playerId. */
    public playerId: number;

    /** skill_wait_for_zhuan_jiao_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_zhuan_jiao_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_zhuan_jiao_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_zhuan_jiao_toc instance
     */
    public static create(properties?: Iskill_wait_for_zhuan_jiao_toc): skill_wait_for_zhuan_jiao_toc;

    /**
     * Encodes the specified skill_wait_for_zhuan_jiao_toc message. Does not implicitly {@link skill_wait_for_zhuan_jiao_toc.verify|verify} messages.
     * @param message skill_wait_for_zhuan_jiao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_zhuan_jiao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_zhuan_jiao_toc message, length delimited. Does not implicitly {@link skill_wait_for_zhuan_jiao_toc.verify|verify} messages.
     * @param message skill_wait_for_zhuan_jiao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_zhuan_jiao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_zhuan_jiao_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_zhuan_jiao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_zhuan_jiao_toc;

    /**
     * Decodes a skill_wait_for_zhuan_jiao_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_zhuan_jiao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_zhuan_jiao_toc;

    /**
     * Verifies a skill_wait_for_zhuan_jiao_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_zhuan_jiao_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_zhuan_jiao_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_zhuan_jiao_toc;

    /**
     * Creates a plain object from a skill_wait_for_zhuan_jiao_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_zhuan_jiao_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_zhuan_jiao_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_zhuan_jiao_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_zhuan_jiao_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_zhuan_jiao_tos. */
export class skill_zhuan_jiao_tos implements Iskill_zhuan_jiao_tos {

    /**
     * Constructs a new skill_zhuan_jiao_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_zhuan_jiao_tos);

    /** skill_zhuan_jiao_tos enable. */
    public enable: boolean;

    /** skill_zhuan_jiao_tos cardId. */
    public cardId: number;

    /** skill_zhuan_jiao_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_zhuan_jiao_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_zhuan_jiao_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_zhuan_jiao_tos instance
     */
    public static create(properties?: Iskill_zhuan_jiao_tos): skill_zhuan_jiao_tos;

    /**
     * Encodes the specified skill_zhuan_jiao_tos message. Does not implicitly {@link skill_zhuan_jiao_tos.verify|verify} messages.
     * @param message skill_zhuan_jiao_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_zhuan_jiao_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_zhuan_jiao_tos message, length delimited. Does not implicitly {@link skill_zhuan_jiao_tos.verify|verify} messages.
     * @param message skill_zhuan_jiao_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_zhuan_jiao_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_zhuan_jiao_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_zhuan_jiao_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_zhuan_jiao_tos;

    /**
     * Decodes a skill_zhuan_jiao_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_zhuan_jiao_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_zhuan_jiao_tos;

    /**
     * Verifies a skill_zhuan_jiao_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_zhuan_jiao_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_zhuan_jiao_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_zhuan_jiao_tos;

    /**
     * Creates a plain object from a skill_zhuan_jiao_tos message. Also converts values to other types if specified.
     * @param message skill_zhuan_jiao_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_zhuan_jiao_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_zhuan_jiao_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_zhuan_jiao_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_zhuan_jiao_toc. */
export class skill_zhuan_jiao_toc implements Iskill_zhuan_jiao_toc {

    /**
     * Constructs a new skill_zhuan_jiao_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_zhuan_jiao_toc);

    /** skill_zhuan_jiao_toc playerId. */
    public playerId: number;

    /** skill_zhuan_jiao_toc cardId. */
    public cardId: number;

    /** skill_zhuan_jiao_toc targetPlayerId. */
    public targetPlayerId: number;

    /**
     * Creates a new skill_zhuan_jiao_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_zhuan_jiao_toc instance
     */
    public static create(properties?: Iskill_zhuan_jiao_toc): skill_zhuan_jiao_toc;

    /**
     * Encodes the specified skill_zhuan_jiao_toc message. Does not implicitly {@link skill_zhuan_jiao_toc.verify|verify} messages.
     * @param message skill_zhuan_jiao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_zhuan_jiao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_zhuan_jiao_toc message, length delimited. Does not implicitly {@link skill_zhuan_jiao_toc.verify|verify} messages.
     * @param message skill_zhuan_jiao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_zhuan_jiao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_zhuan_jiao_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_zhuan_jiao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_zhuan_jiao_toc;

    /**
     * Decodes a skill_zhuan_jiao_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_zhuan_jiao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_zhuan_jiao_toc;

    /**
     * Verifies a skill_zhuan_jiao_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_zhuan_jiao_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_zhuan_jiao_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_zhuan_jiao_toc;

    /**
     * Creates a plain object from a skill_zhuan_jiao_toc message. Also converts values to other types if specified.
     * @param message skill_zhuan_jiao_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_zhuan_jiao_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_zhuan_jiao_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_zhuan_jiao_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ming_er_toc. */
export class skill_ming_er_toc implements Iskill_ming_er_toc {

    /**
     * Constructs a new skill_ming_er_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ming_er_toc);

    /** skill_ming_er_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_ming_er_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ming_er_toc instance
     */
    public static create(properties?: Iskill_ming_er_toc): skill_ming_er_toc;

    /**
     * Encodes the specified skill_ming_er_toc message. Does not implicitly {@link skill_ming_er_toc.verify|verify} messages.
     * @param message skill_ming_er_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ming_er_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ming_er_toc message, length delimited. Does not implicitly {@link skill_ming_er_toc.verify|verify} messages.
     * @param message skill_ming_er_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ming_er_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ming_er_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ming_er_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ming_er_toc;

    /**
     * Decodes a skill_ming_er_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ming_er_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ming_er_toc;

    /**
     * Verifies a skill_ming_er_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ming_er_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ming_er_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_ming_er_toc;

    /**
     * Creates a plain object from a skill_ming_er_toc message. Also converts values to other types if specified.
     * @param message skill_ming_er_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ming_er_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ming_er_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ming_er_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ji_zhi_tos. */
export class skill_ji_zhi_tos implements Iskill_ji_zhi_tos {

    /**
     * Constructs a new skill_ji_zhi_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ji_zhi_tos);

    /** skill_ji_zhi_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_ji_zhi_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ji_zhi_tos instance
     */
    public static create(properties?: Iskill_ji_zhi_tos): skill_ji_zhi_tos;

    /**
     * Encodes the specified skill_ji_zhi_tos message. Does not implicitly {@link skill_ji_zhi_tos.verify|verify} messages.
     * @param message skill_ji_zhi_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ji_zhi_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ji_zhi_tos message, length delimited. Does not implicitly {@link skill_ji_zhi_tos.verify|verify} messages.
     * @param message skill_ji_zhi_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ji_zhi_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ji_zhi_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ji_zhi_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ji_zhi_tos;

    /**
     * Decodes a skill_ji_zhi_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ji_zhi_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ji_zhi_tos;

    /**
     * Verifies a skill_ji_zhi_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ji_zhi_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ji_zhi_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_ji_zhi_tos;

    /**
     * Creates a plain object from a skill_ji_zhi_tos message. Also converts values to other types if specified.
     * @param message skill_ji_zhi_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ji_zhi_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ji_zhi_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ji_zhi_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ji_zhi_toc. */
export class skill_ji_zhi_toc implements Iskill_ji_zhi_toc {

    /**
     * Constructs a new skill_ji_zhi_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ji_zhi_toc);

    /** skill_ji_zhi_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_ji_zhi_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ji_zhi_toc instance
     */
    public static create(properties?: Iskill_ji_zhi_toc): skill_ji_zhi_toc;

    /**
     * Encodes the specified skill_ji_zhi_toc message. Does not implicitly {@link skill_ji_zhi_toc.verify|verify} messages.
     * @param message skill_ji_zhi_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ji_zhi_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ji_zhi_toc message, length delimited. Does not implicitly {@link skill_ji_zhi_toc.verify|verify} messages.
     * @param message skill_ji_zhi_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ji_zhi_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ji_zhi_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ji_zhi_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ji_zhi_toc;

    /**
     * Decodes a skill_ji_zhi_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ji_zhi_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ji_zhi_toc;

    /**
     * Verifies a skill_ji_zhi_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ji_zhi_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ji_zhi_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_ji_zhi_toc;

    /**
     * Creates a plain object from a skill_ji_zhi_toc message. Also converts values to other types if specified.
     * @param message skill_ji_zhi_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ji_zhi_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ji_zhi_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ji_zhi_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_cheng_zhi_toc. */
export class skill_wait_for_cheng_zhi_toc implements Iskill_wait_for_cheng_zhi_toc {

    /**
     * Constructs a new skill_wait_for_cheng_zhi_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_cheng_zhi_toc);

    /** skill_wait_for_cheng_zhi_toc playerId. */
    public playerId: number;

    /** skill_wait_for_cheng_zhi_toc diePlayerId. */
    public diePlayerId: number;

    /** skill_wait_for_cheng_zhi_toc cards. */
    public cards: Icard[];

    /** skill_wait_for_cheng_zhi_toc identity. */
    public identity: color;

    /** skill_wait_for_cheng_zhi_toc secretTask. */
    public secretTask: secret_task;

    /** skill_wait_for_cheng_zhi_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_cheng_zhi_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_cheng_zhi_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_cheng_zhi_toc instance
     */
    public static create(properties?: Iskill_wait_for_cheng_zhi_toc): skill_wait_for_cheng_zhi_toc;

    /**
     * Encodes the specified skill_wait_for_cheng_zhi_toc message. Does not implicitly {@link skill_wait_for_cheng_zhi_toc.verify|verify} messages.
     * @param message skill_wait_for_cheng_zhi_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_cheng_zhi_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_cheng_zhi_toc message, length delimited. Does not implicitly {@link skill_wait_for_cheng_zhi_toc.verify|verify} messages.
     * @param message skill_wait_for_cheng_zhi_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_cheng_zhi_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_cheng_zhi_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_cheng_zhi_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_cheng_zhi_toc;

    /**
     * Decodes a skill_wait_for_cheng_zhi_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_cheng_zhi_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_cheng_zhi_toc;

    /**
     * Verifies a skill_wait_for_cheng_zhi_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_cheng_zhi_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_cheng_zhi_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_cheng_zhi_toc;

    /**
     * Creates a plain object from a skill_wait_for_cheng_zhi_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_cheng_zhi_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_cheng_zhi_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_cheng_zhi_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_cheng_zhi_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_cheng_zhi_tos. */
export class skill_cheng_zhi_tos implements Iskill_cheng_zhi_tos {

    /**
     * Constructs a new skill_cheng_zhi_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_cheng_zhi_tos);

    /** skill_cheng_zhi_tos enable. */
    public enable: boolean;

    /** skill_cheng_zhi_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_cheng_zhi_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_cheng_zhi_tos instance
     */
    public static create(properties?: Iskill_cheng_zhi_tos): skill_cheng_zhi_tos;

    /**
     * Encodes the specified skill_cheng_zhi_tos message. Does not implicitly {@link skill_cheng_zhi_tos.verify|verify} messages.
     * @param message skill_cheng_zhi_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_cheng_zhi_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_cheng_zhi_tos message, length delimited. Does not implicitly {@link skill_cheng_zhi_tos.verify|verify} messages.
     * @param message skill_cheng_zhi_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_cheng_zhi_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_cheng_zhi_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_cheng_zhi_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_cheng_zhi_tos;

    /**
     * Decodes a skill_cheng_zhi_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_cheng_zhi_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_cheng_zhi_tos;

    /**
     * Verifies a skill_cheng_zhi_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_cheng_zhi_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_cheng_zhi_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_cheng_zhi_tos;

    /**
     * Creates a plain object from a skill_cheng_zhi_tos message. Also converts values to other types if specified.
     * @param message skill_cheng_zhi_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_cheng_zhi_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_cheng_zhi_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_cheng_zhi_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_cheng_zhi_toc. */
export class skill_cheng_zhi_toc implements Iskill_cheng_zhi_toc {

    /**
     * Constructs a new skill_cheng_zhi_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_cheng_zhi_toc);

    /** skill_cheng_zhi_toc playerId. */
    public playerId: number;

    /** skill_cheng_zhi_toc diePlayerId. */
    public diePlayerId: number;

    /** skill_cheng_zhi_toc enable. */
    public enable: boolean;

    /**
     * Creates a new skill_cheng_zhi_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_cheng_zhi_toc instance
     */
    public static create(properties?: Iskill_cheng_zhi_toc): skill_cheng_zhi_toc;

    /**
     * Encodes the specified skill_cheng_zhi_toc message. Does not implicitly {@link skill_cheng_zhi_toc.verify|verify} messages.
     * @param message skill_cheng_zhi_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_cheng_zhi_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_cheng_zhi_toc message, length delimited. Does not implicitly {@link skill_cheng_zhi_toc.verify|verify} messages.
     * @param message skill_cheng_zhi_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_cheng_zhi_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_cheng_zhi_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_cheng_zhi_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_cheng_zhi_toc;

    /**
     * Decodes a skill_cheng_zhi_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_cheng_zhi_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_cheng_zhi_toc;

    /**
     * Verifies a skill_cheng_zhi_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_cheng_zhi_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_cheng_zhi_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_cheng_zhi_toc;

    /**
     * Creates a plain object from a skill_cheng_zhi_toc message. Also converts values to other types if specified.
     * @param message skill_cheng_zhi_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_cheng_zhi_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_cheng_zhi_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_cheng_zhi_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiu_ji_a_toc. */
export class skill_jiu_ji_a_toc implements Iskill_jiu_ji_a_toc {

    /**
     * Constructs a new skill_jiu_ji_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiu_ji_a_toc);

    /** skill_jiu_ji_a_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_jiu_ji_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiu_ji_a_toc instance
     */
    public static create(properties?: Iskill_jiu_ji_a_toc): skill_jiu_ji_a_toc;

    /**
     * Encodes the specified skill_jiu_ji_a_toc message. Does not implicitly {@link skill_jiu_ji_a_toc.verify|verify} messages.
     * @param message skill_jiu_ji_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiu_ji_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiu_ji_a_toc message, length delimited. Does not implicitly {@link skill_jiu_ji_a_toc.verify|verify} messages.
     * @param message skill_jiu_ji_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiu_ji_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiu_ji_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiu_ji_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiu_ji_a_toc;

    /**
     * Decodes a skill_jiu_ji_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiu_ji_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiu_ji_a_toc;

    /**
     * Verifies a skill_jiu_ji_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiu_ji_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiu_ji_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jiu_ji_a_toc;

    /**
     * Creates a plain object from a skill_jiu_ji_a_toc message. Also converts values to other types if specified.
     * @param message skill_jiu_ji_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiu_ji_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiu_ji_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiu_ji_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_cheng_fu_toc. */
export class skill_cheng_fu_toc implements Iskill_cheng_fu_toc {

    /**
     * Constructs a new skill_cheng_fu_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_cheng_fu_toc);

    /** skill_cheng_fu_toc playerId. */
    public playerId: number;

    /** skill_cheng_fu_toc fromPlayerId. */
    public fromPlayerId: number;

    /** skill_cheng_fu_toc card. */
    public card?: (Icard|null);

    /** skill_cheng_fu_toc unknownCardCount. */
    public unknownCardCount: number;

    /**
     * Creates a new skill_cheng_fu_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_cheng_fu_toc instance
     */
    public static create(properties?: Iskill_cheng_fu_toc): skill_cheng_fu_toc;

    /**
     * Encodes the specified skill_cheng_fu_toc message. Does not implicitly {@link skill_cheng_fu_toc.verify|verify} messages.
     * @param message skill_cheng_fu_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_cheng_fu_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_cheng_fu_toc message, length delimited. Does not implicitly {@link skill_cheng_fu_toc.verify|verify} messages.
     * @param message skill_cheng_fu_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_cheng_fu_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_cheng_fu_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_cheng_fu_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_cheng_fu_toc;

    /**
     * Decodes a skill_cheng_fu_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_cheng_fu_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_cheng_fu_toc;

    /**
     * Verifies a skill_cheng_fu_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_cheng_fu_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_cheng_fu_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_cheng_fu_toc;

    /**
     * Creates a plain object from a skill_cheng_fu_toc message. Also converts values to other types if specified.
     * @param message skill_cheng_fu_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_cheng_fu_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_cheng_fu_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_cheng_fu_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiu_ji_b_toc. */
export class skill_jiu_ji_b_toc implements Iskill_jiu_ji_b_toc {

    /**
     * Constructs a new skill_jiu_ji_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiu_ji_b_toc);

    /** skill_jiu_ji_b_toc playerId. */
    public playerId: number;

    /** skill_jiu_ji_b_toc card. */
    public card?: (Icard|null);

    /** skill_jiu_ji_b_toc unknownCardCount. */
    public unknownCardCount: number;

    /**
     * Creates a new skill_jiu_ji_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiu_ji_b_toc instance
     */
    public static create(properties?: Iskill_jiu_ji_b_toc): skill_jiu_ji_b_toc;

    /**
     * Encodes the specified skill_jiu_ji_b_toc message. Does not implicitly {@link skill_jiu_ji_b_toc.verify|verify} messages.
     * @param message skill_jiu_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiu_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiu_ji_b_toc message, length delimited. Does not implicitly {@link skill_jiu_ji_b_toc.verify|verify} messages.
     * @param message skill_jiu_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiu_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiu_ji_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiu_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiu_ji_b_toc;

    /**
     * Decodes a skill_jiu_ji_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiu_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiu_ji_b_toc;

    /**
     * Verifies a skill_jiu_ji_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiu_ji_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiu_ji_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jiu_ji_b_toc;

    /**
     * Creates a plain object from a skill_jiu_ji_b_toc message. Also converts values to other types if specified.
     * @param message skill_jiu_ji_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiu_ji_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiu_ji_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiu_ji_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_yi_xin_toc. */
export class skill_wait_for_yi_xin_toc implements Iskill_wait_for_yi_xin_toc {

    /**
     * Constructs a new skill_wait_for_yi_xin_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_yi_xin_toc);

    /** skill_wait_for_yi_xin_toc playerId. */
    public playerId: number;

    /** skill_wait_for_yi_xin_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_yi_xin_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_yi_xin_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_yi_xin_toc instance
     */
    public static create(properties?: Iskill_wait_for_yi_xin_toc): skill_wait_for_yi_xin_toc;

    /**
     * Encodes the specified skill_wait_for_yi_xin_toc message. Does not implicitly {@link skill_wait_for_yi_xin_toc.verify|verify} messages.
     * @param message skill_wait_for_yi_xin_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_yi_xin_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_yi_xin_toc message, length delimited. Does not implicitly {@link skill_wait_for_yi_xin_toc.verify|verify} messages.
     * @param message skill_wait_for_yi_xin_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_yi_xin_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_yi_xin_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_yi_xin_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_yi_xin_toc;

    /**
     * Decodes a skill_wait_for_yi_xin_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_yi_xin_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_yi_xin_toc;

    /**
     * Verifies a skill_wait_for_yi_xin_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_yi_xin_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_yi_xin_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_yi_xin_toc;

    /**
     * Creates a plain object from a skill_wait_for_yi_xin_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_yi_xin_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_yi_xin_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_yi_xin_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_yi_xin_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_yi_xin_tos. */
export class skill_yi_xin_tos implements Iskill_yi_xin_tos {

    /**
     * Constructs a new skill_yi_xin_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_yi_xin_tos);

    /** skill_yi_xin_tos enable. */
    public enable: boolean;

    /** skill_yi_xin_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_yi_xin_tos cardId. */
    public cardId: number;

    /** skill_yi_xin_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_yi_xin_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_yi_xin_tos instance
     */
    public static create(properties?: Iskill_yi_xin_tos): skill_yi_xin_tos;

    /**
     * Encodes the specified skill_yi_xin_tos message. Does not implicitly {@link skill_yi_xin_tos.verify|verify} messages.
     * @param message skill_yi_xin_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_yi_xin_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_yi_xin_tos message, length delimited. Does not implicitly {@link skill_yi_xin_tos.verify|verify} messages.
     * @param message skill_yi_xin_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_yi_xin_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_yi_xin_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_yi_xin_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_yi_xin_tos;

    /**
     * Decodes a skill_yi_xin_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_yi_xin_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_yi_xin_tos;

    /**
     * Verifies a skill_yi_xin_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_yi_xin_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_yi_xin_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_yi_xin_tos;

    /**
     * Creates a plain object from a skill_yi_xin_tos message. Also converts values to other types if specified.
     * @param message skill_yi_xin_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_yi_xin_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_yi_xin_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_yi_xin_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_yi_xin_toc. */
export class skill_yi_xin_toc implements Iskill_yi_xin_toc {

    /**
     * Constructs a new skill_yi_xin_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_yi_xin_toc);

    /** skill_yi_xin_toc playerId. */
    public playerId: number;

    /** skill_yi_xin_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_yi_xin_toc card. */
    public card?: (Icard|null);

    /** skill_yi_xin_toc enable. */
    public enable: boolean;

    /**
     * Creates a new skill_yi_xin_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_yi_xin_toc instance
     */
    public static create(properties?: Iskill_yi_xin_toc): skill_yi_xin_toc;

    /**
     * Encodes the specified skill_yi_xin_toc message. Does not implicitly {@link skill_yi_xin_toc.verify|verify} messages.
     * @param message skill_yi_xin_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_yi_xin_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_yi_xin_toc message, length delimited. Does not implicitly {@link skill_yi_xin_toc.verify|verify} messages.
     * @param message skill_yi_xin_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_yi_xin_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_yi_xin_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_yi_xin_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_yi_xin_toc;

    /**
     * Decodes a skill_yi_xin_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_yi_xin_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_yi_xin_toc;

    /**
     * Verifies a skill_yi_xin_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_yi_xin_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_yi_xin_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_yi_xin_toc;

    /**
     * Creates a plain object from a skill_yi_xin_toc message. Also converts values to other types if specified.
     * @param message skill_yi_xin_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_yi_xin_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_yi_xin_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_yi_xin_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_zhi_yin_toc. */
export class skill_zhi_yin_toc implements Iskill_zhi_yin_toc {

    /**
     * Constructs a new skill_zhi_yin_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_zhi_yin_toc);

    /** skill_zhi_yin_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_zhi_yin_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_zhi_yin_toc instance
     */
    public static create(properties?: Iskill_zhi_yin_toc): skill_zhi_yin_toc;

    /**
     * Encodes the specified skill_zhi_yin_toc message. Does not implicitly {@link skill_zhi_yin_toc.verify|verify} messages.
     * @param message skill_zhi_yin_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_zhi_yin_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_zhi_yin_toc message, length delimited. Does not implicitly {@link skill_zhi_yin_toc.verify|verify} messages.
     * @param message skill_zhi_yin_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_zhi_yin_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_zhi_yin_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_zhi_yin_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_zhi_yin_toc;

    /**
     * Decodes a skill_zhi_yin_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_zhi_yin_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_zhi_yin_toc;

    /**
     * Verifies a skill_zhi_yin_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_zhi_yin_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_zhi_yin_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_zhi_yin_toc;

    /**
     * Creates a plain object from a skill_zhi_yin_toc message. Also converts values to other types if specified.
     * @param message skill_zhi_yin_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_zhi_yin_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_zhi_yin_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_zhi_yin_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jing_meng_a_tos. */
export class skill_jing_meng_a_tos implements Iskill_jing_meng_a_tos {

    /**
     * Constructs a new skill_jing_meng_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jing_meng_a_tos);

    /** skill_jing_meng_a_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jing_meng_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jing_meng_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jing_meng_a_tos instance
     */
    public static create(properties?: Iskill_jing_meng_a_tos): skill_jing_meng_a_tos;

    /**
     * Encodes the specified skill_jing_meng_a_tos message. Does not implicitly {@link skill_jing_meng_a_tos.verify|verify} messages.
     * @param message skill_jing_meng_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jing_meng_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jing_meng_a_tos message, length delimited. Does not implicitly {@link skill_jing_meng_a_tos.verify|verify} messages.
     * @param message skill_jing_meng_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jing_meng_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jing_meng_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jing_meng_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jing_meng_a_tos;

    /**
     * Decodes a skill_jing_meng_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jing_meng_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jing_meng_a_tos;

    /**
     * Verifies a skill_jing_meng_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jing_meng_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jing_meng_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jing_meng_a_tos;

    /**
     * Creates a plain object from a skill_jing_meng_a_tos message. Also converts values to other types if specified.
     * @param message skill_jing_meng_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jing_meng_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jing_meng_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jing_meng_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jing_meng_a_toc. */
export class skill_jing_meng_a_toc implements Iskill_jing_meng_a_toc {

    /**
     * Constructs a new skill_jing_meng_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jing_meng_a_toc);

    /** skill_jing_meng_a_toc playerId. */
    public playerId: number;

    /** skill_jing_meng_a_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jing_meng_a_toc cards. */
    public cards: Icard[];

    /** skill_jing_meng_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_jing_meng_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_jing_meng_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jing_meng_a_toc instance
     */
    public static create(properties?: Iskill_jing_meng_a_toc): skill_jing_meng_a_toc;

    /**
     * Encodes the specified skill_jing_meng_a_toc message. Does not implicitly {@link skill_jing_meng_a_toc.verify|verify} messages.
     * @param message skill_jing_meng_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jing_meng_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jing_meng_a_toc message, length delimited. Does not implicitly {@link skill_jing_meng_a_toc.verify|verify} messages.
     * @param message skill_jing_meng_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jing_meng_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jing_meng_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jing_meng_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jing_meng_a_toc;

    /**
     * Decodes a skill_jing_meng_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jing_meng_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jing_meng_a_toc;

    /**
     * Verifies a skill_jing_meng_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jing_meng_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jing_meng_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jing_meng_a_toc;

    /**
     * Creates a plain object from a skill_jing_meng_a_toc message. Also converts values to other types if specified.
     * @param message skill_jing_meng_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jing_meng_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jing_meng_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jing_meng_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jing_meng_b_tos. */
export class skill_jing_meng_b_tos implements Iskill_jing_meng_b_tos {

    /**
     * Constructs a new skill_jing_meng_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jing_meng_b_tos);

    /** skill_jing_meng_b_tos cardId. */
    public cardId: number;

    /** skill_jing_meng_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jing_meng_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jing_meng_b_tos instance
     */
    public static create(properties?: Iskill_jing_meng_b_tos): skill_jing_meng_b_tos;

    /**
     * Encodes the specified skill_jing_meng_b_tos message. Does not implicitly {@link skill_jing_meng_b_tos.verify|verify} messages.
     * @param message skill_jing_meng_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jing_meng_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jing_meng_b_tos message, length delimited. Does not implicitly {@link skill_jing_meng_b_tos.verify|verify} messages.
     * @param message skill_jing_meng_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jing_meng_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jing_meng_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jing_meng_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jing_meng_b_tos;

    /**
     * Decodes a skill_jing_meng_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jing_meng_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jing_meng_b_tos;

    /**
     * Verifies a skill_jing_meng_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jing_meng_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jing_meng_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jing_meng_b_tos;

    /**
     * Creates a plain object from a skill_jing_meng_b_tos message. Also converts values to other types if specified.
     * @param message skill_jing_meng_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jing_meng_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jing_meng_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jing_meng_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jing_meng_b_toc. */
export class skill_jing_meng_b_toc implements Iskill_jing_meng_b_toc {

    /**
     * Constructs a new skill_jing_meng_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jing_meng_b_toc);

    /** skill_jing_meng_b_toc playerId. */
    public playerId: number;

    /** skill_jing_meng_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jing_meng_b_toc card. */
    public card?: (Icard|null);

    /**
     * Creates a new skill_jing_meng_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jing_meng_b_toc instance
     */
    public static create(properties?: Iskill_jing_meng_b_toc): skill_jing_meng_b_toc;

    /**
     * Encodes the specified skill_jing_meng_b_toc message. Does not implicitly {@link skill_jing_meng_b_toc.verify|verify} messages.
     * @param message skill_jing_meng_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jing_meng_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jing_meng_b_toc message, length delimited. Does not implicitly {@link skill_jing_meng_b_toc.verify|verify} messages.
     * @param message skill_jing_meng_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jing_meng_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jing_meng_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jing_meng_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jing_meng_b_toc;

    /**
     * Decodes a skill_jing_meng_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jing_meng_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jing_meng_b_toc;

    /**
     * Verifies a skill_jing_meng_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jing_meng_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jing_meng_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jing_meng_b_toc;

    /**
     * Creates a plain object from a skill_jing_meng_b_toc message. Also converts values to other types if specified.
     * @param message skill_jing_meng_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jing_meng_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jing_meng_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jing_meng_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jie_dao_sha_ren_a_tos. */
export class skill_jie_dao_sha_ren_a_tos implements Iskill_jie_dao_sha_ren_a_tos {

    /**
     * Constructs a new skill_jie_dao_sha_ren_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jie_dao_sha_ren_a_tos);

    /** skill_jie_dao_sha_ren_a_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jie_dao_sha_ren_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jie_dao_sha_ren_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jie_dao_sha_ren_a_tos instance
     */
    public static create(properties?: Iskill_jie_dao_sha_ren_a_tos): skill_jie_dao_sha_ren_a_tos;

    /**
     * Encodes the specified skill_jie_dao_sha_ren_a_tos message. Does not implicitly {@link skill_jie_dao_sha_ren_a_tos.verify|verify} messages.
     * @param message skill_jie_dao_sha_ren_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jie_dao_sha_ren_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jie_dao_sha_ren_a_tos message, length delimited. Does not implicitly {@link skill_jie_dao_sha_ren_a_tos.verify|verify} messages.
     * @param message skill_jie_dao_sha_ren_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jie_dao_sha_ren_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jie_dao_sha_ren_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jie_dao_sha_ren_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jie_dao_sha_ren_a_tos;

    /**
     * Decodes a skill_jie_dao_sha_ren_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jie_dao_sha_ren_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jie_dao_sha_ren_a_tos;

    /**
     * Verifies a skill_jie_dao_sha_ren_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jie_dao_sha_ren_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jie_dao_sha_ren_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jie_dao_sha_ren_a_tos;

    /**
     * Creates a plain object from a skill_jie_dao_sha_ren_a_tos message. Also converts values to other types if specified.
     * @param message skill_jie_dao_sha_ren_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jie_dao_sha_ren_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jie_dao_sha_ren_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jie_dao_sha_ren_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jie_dao_sha_ren_a_toc. */
export class skill_jie_dao_sha_ren_a_toc implements Iskill_jie_dao_sha_ren_a_toc {

    /**
     * Constructs a new skill_jie_dao_sha_ren_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jie_dao_sha_ren_a_toc);

    /** skill_jie_dao_sha_ren_a_toc playerId. */
    public playerId: number;

    /** skill_jie_dao_sha_ren_a_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jie_dao_sha_ren_a_toc card. */
    public card?: (Icard|null);

    /** skill_jie_dao_sha_ren_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_jie_dao_sha_ren_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_jie_dao_sha_ren_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jie_dao_sha_ren_a_toc instance
     */
    public static create(properties?: Iskill_jie_dao_sha_ren_a_toc): skill_jie_dao_sha_ren_a_toc;

    /**
     * Encodes the specified skill_jie_dao_sha_ren_a_toc message. Does not implicitly {@link skill_jie_dao_sha_ren_a_toc.verify|verify} messages.
     * @param message skill_jie_dao_sha_ren_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jie_dao_sha_ren_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jie_dao_sha_ren_a_toc message, length delimited. Does not implicitly {@link skill_jie_dao_sha_ren_a_toc.verify|verify} messages.
     * @param message skill_jie_dao_sha_ren_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jie_dao_sha_ren_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jie_dao_sha_ren_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jie_dao_sha_ren_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jie_dao_sha_ren_a_toc;

    /**
     * Decodes a skill_jie_dao_sha_ren_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jie_dao_sha_ren_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jie_dao_sha_ren_a_toc;

    /**
     * Verifies a skill_jie_dao_sha_ren_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jie_dao_sha_ren_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jie_dao_sha_ren_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jie_dao_sha_ren_a_toc;

    /**
     * Creates a plain object from a skill_jie_dao_sha_ren_a_toc message. Also converts values to other types if specified.
     * @param message skill_jie_dao_sha_ren_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jie_dao_sha_ren_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jie_dao_sha_ren_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jie_dao_sha_ren_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jie_dao_sha_ren_b_tos. */
export class skill_jie_dao_sha_ren_b_tos implements Iskill_jie_dao_sha_ren_b_tos {

    /**
     * Constructs a new skill_jie_dao_sha_ren_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jie_dao_sha_ren_b_tos);

    /** skill_jie_dao_sha_ren_b_tos enable. */
    public enable: boolean;

    /** skill_jie_dao_sha_ren_b_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jie_dao_sha_ren_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jie_dao_sha_ren_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jie_dao_sha_ren_b_tos instance
     */
    public static create(properties?: Iskill_jie_dao_sha_ren_b_tos): skill_jie_dao_sha_ren_b_tos;

    /**
     * Encodes the specified skill_jie_dao_sha_ren_b_tos message. Does not implicitly {@link skill_jie_dao_sha_ren_b_tos.verify|verify} messages.
     * @param message skill_jie_dao_sha_ren_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jie_dao_sha_ren_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jie_dao_sha_ren_b_tos message, length delimited. Does not implicitly {@link skill_jie_dao_sha_ren_b_tos.verify|verify} messages.
     * @param message skill_jie_dao_sha_ren_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jie_dao_sha_ren_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jie_dao_sha_ren_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jie_dao_sha_ren_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jie_dao_sha_ren_b_tos;

    /**
     * Decodes a skill_jie_dao_sha_ren_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jie_dao_sha_ren_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jie_dao_sha_ren_b_tos;

    /**
     * Verifies a skill_jie_dao_sha_ren_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jie_dao_sha_ren_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jie_dao_sha_ren_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jie_dao_sha_ren_b_tos;

    /**
     * Creates a plain object from a skill_jie_dao_sha_ren_b_tos message. Also converts values to other types if specified.
     * @param message skill_jie_dao_sha_ren_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jie_dao_sha_ren_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jie_dao_sha_ren_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jie_dao_sha_ren_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jie_dao_sha_ren_b_toc. */
export class skill_jie_dao_sha_ren_b_toc implements Iskill_jie_dao_sha_ren_b_toc {

    /**
     * Constructs a new skill_jie_dao_sha_ren_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jie_dao_sha_ren_b_toc);

    /** skill_jie_dao_sha_ren_b_toc playerId. */
    public playerId: number;

    /** skill_jie_dao_sha_ren_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jie_dao_sha_ren_b_toc card. */
    public card?: (Icard|null);

    /**
     * Creates a new skill_jie_dao_sha_ren_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jie_dao_sha_ren_b_toc instance
     */
    public static create(properties?: Iskill_jie_dao_sha_ren_b_toc): skill_jie_dao_sha_ren_b_toc;

    /**
     * Encodes the specified skill_jie_dao_sha_ren_b_toc message. Does not implicitly {@link skill_jie_dao_sha_ren_b_toc.verify|verify} messages.
     * @param message skill_jie_dao_sha_ren_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jie_dao_sha_ren_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jie_dao_sha_ren_b_toc message, length delimited. Does not implicitly {@link skill_jie_dao_sha_ren_b_toc.verify|verify} messages.
     * @param message skill_jie_dao_sha_ren_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jie_dao_sha_ren_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jie_dao_sha_ren_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jie_dao_sha_ren_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jie_dao_sha_ren_b_toc;

    /**
     * Decodes a skill_jie_dao_sha_ren_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jie_dao_sha_ren_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jie_dao_sha_ren_b_toc;

    /**
     * Verifies a skill_jie_dao_sha_ren_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jie_dao_sha_ren_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jie_dao_sha_ren_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jie_dao_sha_ren_b_toc;

    /**
     * Creates a plain object from a skill_jie_dao_sha_ren_b_toc message. Also converts values to other types if specified.
     * @param message skill_jie_dao_sha_ren_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jie_dao_sha_ren_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jie_dao_sha_ren_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jie_dao_sha_ren_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiao_ji_a_tos. */
export class skill_jiao_ji_a_tos implements Iskill_jiao_ji_a_tos {

    /**
     * Constructs a new skill_jiao_ji_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiao_ji_a_tos);

    /** skill_jiao_ji_a_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jiao_ji_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jiao_ji_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiao_ji_a_tos instance
     */
    public static create(properties?: Iskill_jiao_ji_a_tos): skill_jiao_ji_a_tos;

    /**
     * Encodes the specified skill_jiao_ji_a_tos message. Does not implicitly {@link skill_jiao_ji_a_tos.verify|verify} messages.
     * @param message skill_jiao_ji_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiao_ji_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiao_ji_a_tos message, length delimited. Does not implicitly {@link skill_jiao_ji_a_tos.verify|verify} messages.
     * @param message skill_jiao_ji_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiao_ji_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiao_ji_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiao_ji_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiao_ji_a_tos;

    /**
     * Decodes a skill_jiao_ji_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiao_ji_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiao_ji_a_tos;

    /**
     * Verifies a skill_jiao_ji_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiao_ji_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiao_ji_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jiao_ji_a_tos;

    /**
     * Creates a plain object from a skill_jiao_ji_a_tos message. Also converts values to other types if specified.
     * @param message skill_jiao_ji_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiao_ji_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiao_ji_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiao_ji_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiao_ji_a_toc. */
export class skill_jiao_ji_a_toc implements Iskill_jiao_ji_a_toc {

    /**
     * Constructs a new skill_jiao_ji_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiao_ji_a_toc);

    /** skill_jiao_ji_a_toc playerId. */
    public playerId: number;

    /** skill_jiao_ji_a_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jiao_ji_a_toc cards. */
    public cards: Icard[];

    /** skill_jiao_ji_a_toc unknownCardCount. */
    public unknownCardCount: number;

    /** skill_jiao_ji_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_jiao_ji_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_jiao_ji_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiao_ji_a_toc instance
     */
    public static create(properties?: Iskill_jiao_ji_a_toc): skill_jiao_ji_a_toc;

    /**
     * Encodes the specified skill_jiao_ji_a_toc message. Does not implicitly {@link skill_jiao_ji_a_toc.verify|verify} messages.
     * @param message skill_jiao_ji_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiao_ji_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiao_ji_a_toc message, length delimited. Does not implicitly {@link skill_jiao_ji_a_toc.verify|verify} messages.
     * @param message skill_jiao_ji_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiao_ji_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiao_ji_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiao_ji_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiao_ji_a_toc;

    /**
     * Decodes a skill_jiao_ji_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiao_ji_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiao_ji_a_toc;

    /**
     * Verifies a skill_jiao_ji_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiao_ji_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiao_ji_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jiao_ji_a_toc;

    /**
     * Creates a plain object from a skill_jiao_ji_a_toc message. Also converts values to other types if specified.
     * @param message skill_jiao_ji_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiao_ji_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiao_ji_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiao_ji_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiao_ji_b_tos. */
export class skill_jiao_ji_b_tos implements Iskill_jiao_ji_b_tos {

    /**
     * Constructs a new skill_jiao_ji_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiao_ji_b_tos);

    /** skill_jiao_ji_b_tos cardIds. */
    public cardIds: number[];

    /** skill_jiao_ji_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jiao_ji_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiao_ji_b_tos instance
     */
    public static create(properties?: Iskill_jiao_ji_b_tos): skill_jiao_ji_b_tos;

    /**
     * Encodes the specified skill_jiao_ji_b_tos message. Does not implicitly {@link skill_jiao_ji_b_tos.verify|verify} messages.
     * @param message skill_jiao_ji_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiao_ji_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiao_ji_b_tos message, length delimited. Does not implicitly {@link skill_jiao_ji_b_tos.verify|verify} messages.
     * @param message skill_jiao_ji_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiao_ji_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiao_ji_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiao_ji_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiao_ji_b_tos;

    /**
     * Decodes a skill_jiao_ji_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiao_ji_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiao_ji_b_tos;

    /**
     * Verifies a skill_jiao_ji_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiao_ji_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiao_ji_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jiao_ji_b_tos;

    /**
     * Creates a plain object from a skill_jiao_ji_b_tos message. Also converts values to other types if specified.
     * @param message skill_jiao_ji_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiao_ji_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiao_ji_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiao_ji_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiao_ji_b_toc. */
export class skill_jiao_ji_b_toc implements Iskill_jiao_ji_b_toc {

    /**
     * Constructs a new skill_jiao_ji_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiao_ji_b_toc);

    /** skill_jiao_ji_b_toc playerId. */
    public playerId: number;

    /** skill_jiao_ji_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jiao_ji_b_toc cards. */
    public cards: Icard[];

    /** skill_jiao_ji_b_toc unknownCardCount. */
    public unknownCardCount: number;

    /**
     * Creates a new skill_jiao_ji_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiao_ji_b_toc instance
     */
    public static create(properties?: Iskill_jiao_ji_b_toc): skill_jiao_ji_b_toc;

    /**
     * Encodes the specified skill_jiao_ji_b_toc message. Does not implicitly {@link skill_jiao_ji_b_toc.verify|verify} messages.
     * @param message skill_jiao_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiao_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiao_ji_b_toc message, length delimited. Does not implicitly {@link skill_jiao_ji_b_toc.verify|verify} messages.
     * @param message skill_jiao_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiao_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiao_ji_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiao_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiao_ji_b_toc;

    /**
     * Decodes a skill_jiao_ji_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiao_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiao_ji_b_toc;

    /**
     * Verifies a skill_jiao_ji_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiao_ji_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiao_ji_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jiao_ji_b_toc;

    /**
     * Creates a plain object from a skill_jiao_ji_b_toc message. Also converts values to other types if specified.
     * @param message skill_jiao_ji_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiao_ji_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiao_ji_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiao_ji_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_miao_bi_qiao_bian_a_tos. */
export class skill_miao_bi_qiao_bian_a_tos implements Iskill_miao_bi_qiao_bian_a_tos {

    /**
     * Constructs a new skill_miao_bi_qiao_bian_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_miao_bi_qiao_bian_a_tos);

    /** skill_miao_bi_qiao_bian_a_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_miao_bi_qiao_bian_a_tos cardId. */
    public cardId: number;

    /** skill_miao_bi_qiao_bian_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_miao_bi_qiao_bian_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_miao_bi_qiao_bian_a_tos instance
     */
    public static create(properties?: Iskill_miao_bi_qiao_bian_a_tos): skill_miao_bi_qiao_bian_a_tos;

    /**
     * Encodes the specified skill_miao_bi_qiao_bian_a_tos message. Does not implicitly {@link skill_miao_bi_qiao_bian_a_tos.verify|verify} messages.
     * @param message skill_miao_bi_qiao_bian_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_miao_bi_qiao_bian_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_miao_bi_qiao_bian_a_tos message, length delimited. Does not implicitly {@link skill_miao_bi_qiao_bian_a_tos.verify|verify} messages.
     * @param message skill_miao_bi_qiao_bian_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_miao_bi_qiao_bian_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_miao_bi_qiao_bian_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_miao_bi_qiao_bian_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_miao_bi_qiao_bian_a_tos;

    /**
     * Decodes a skill_miao_bi_qiao_bian_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_miao_bi_qiao_bian_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_miao_bi_qiao_bian_a_tos;

    /**
     * Verifies a skill_miao_bi_qiao_bian_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_miao_bi_qiao_bian_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_miao_bi_qiao_bian_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_miao_bi_qiao_bian_a_tos;

    /**
     * Creates a plain object from a skill_miao_bi_qiao_bian_a_tos message. Also converts values to other types if specified.
     * @param message skill_miao_bi_qiao_bian_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_miao_bi_qiao_bian_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_miao_bi_qiao_bian_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_miao_bi_qiao_bian_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_miao_bi_qiao_bian_a_toc. */
export class skill_miao_bi_qiao_bian_a_toc implements Iskill_miao_bi_qiao_bian_a_toc {

    /**
     * Constructs a new skill_miao_bi_qiao_bian_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_miao_bi_qiao_bian_a_toc);

    /** skill_miao_bi_qiao_bian_a_toc playerId. */
    public playerId: number;

    /** skill_miao_bi_qiao_bian_a_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_miao_bi_qiao_bian_a_toc cardId. */
    public cardId: number;

    /** skill_miao_bi_qiao_bian_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_miao_bi_qiao_bian_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_miao_bi_qiao_bian_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_miao_bi_qiao_bian_a_toc instance
     */
    public static create(properties?: Iskill_miao_bi_qiao_bian_a_toc): skill_miao_bi_qiao_bian_a_toc;

    /**
     * Encodes the specified skill_miao_bi_qiao_bian_a_toc message. Does not implicitly {@link skill_miao_bi_qiao_bian_a_toc.verify|verify} messages.
     * @param message skill_miao_bi_qiao_bian_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_miao_bi_qiao_bian_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_miao_bi_qiao_bian_a_toc message, length delimited. Does not implicitly {@link skill_miao_bi_qiao_bian_a_toc.verify|verify} messages.
     * @param message skill_miao_bi_qiao_bian_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_miao_bi_qiao_bian_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_miao_bi_qiao_bian_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_miao_bi_qiao_bian_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_miao_bi_qiao_bian_a_toc;

    /**
     * Decodes a skill_miao_bi_qiao_bian_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_miao_bi_qiao_bian_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_miao_bi_qiao_bian_a_toc;

    /**
     * Verifies a skill_miao_bi_qiao_bian_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_miao_bi_qiao_bian_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_miao_bi_qiao_bian_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_miao_bi_qiao_bian_a_toc;

    /**
     * Creates a plain object from a skill_miao_bi_qiao_bian_a_toc message. Also converts values to other types if specified.
     * @param message skill_miao_bi_qiao_bian_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_miao_bi_qiao_bian_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_miao_bi_qiao_bian_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_miao_bi_qiao_bian_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_miao_bi_qiao_bian_b_tos. */
export class skill_miao_bi_qiao_bian_b_tos implements Iskill_miao_bi_qiao_bian_b_tos {

    /**
     * Constructs a new skill_miao_bi_qiao_bian_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_miao_bi_qiao_bian_b_tos);

    /** skill_miao_bi_qiao_bian_b_tos enable. */
    public enable: boolean;

    /** skill_miao_bi_qiao_bian_b_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_miao_bi_qiao_bian_b_tos cardId. */
    public cardId: number;

    /** skill_miao_bi_qiao_bian_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_miao_bi_qiao_bian_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_miao_bi_qiao_bian_b_tos instance
     */
    public static create(properties?: Iskill_miao_bi_qiao_bian_b_tos): skill_miao_bi_qiao_bian_b_tos;

    /**
     * Encodes the specified skill_miao_bi_qiao_bian_b_tos message. Does not implicitly {@link skill_miao_bi_qiao_bian_b_tos.verify|verify} messages.
     * @param message skill_miao_bi_qiao_bian_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_miao_bi_qiao_bian_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_miao_bi_qiao_bian_b_tos message, length delimited. Does not implicitly {@link skill_miao_bi_qiao_bian_b_tos.verify|verify} messages.
     * @param message skill_miao_bi_qiao_bian_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_miao_bi_qiao_bian_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_miao_bi_qiao_bian_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_miao_bi_qiao_bian_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_miao_bi_qiao_bian_b_tos;

    /**
     * Decodes a skill_miao_bi_qiao_bian_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_miao_bi_qiao_bian_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_miao_bi_qiao_bian_b_tos;

    /**
     * Verifies a skill_miao_bi_qiao_bian_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_miao_bi_qiao_bian_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_miao_bi_qiao_bian_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_miao_bi_qiao_bian_b_tos;

    /**
     * Creates a plain object from a skill_miao_bi_qiao_bian_b_tos message. Also converts values to other types if specified.
     * @param message skill_miao_bi_qiao_bian_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_miao_bi_qiao_bian_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_miao_bi_qiao_bian_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_miao_bi_qiao_bian_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_miao_bi_qiao_bian_b_toc. */
export class skill_miao_bi_qiao_bian_b_toc implements Iskill_miao_bi_qiao_bian_b_toc {

    /**
     * Constructs a new skill_miao_bi_qiao_bian_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_miao_bi_qiao_bian_b_toc);

    /** skill_miao_bi_qiao_bian_b_toc playerId. */
    public playerId: number;

    /** skill_miao_bi_qiao_bian_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_miao_bi_qiao_bian_b_toc cardId. */
    public cardId: number;

    /**
     * Creates a new skill_miao_bi_qiao_bian_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_miao_bi_qiao_bian_b_toc instance
     */
    public static create(properties?: Iskill_miao_bi_qiao_bian_b_toc): skill_miao_bi_qiao_bian_b_toc;

    /**
     * Encodes the specified skill_miao_bi_qiao_bian_b_toc message. Does not implicitly {@link skill_miao_bi_qiao_bian_b_toc.verify|verify} messages.
     * @param message skill_miao_bi_qiao_bian_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_miao_bi_qiao_bian_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_miao_bi_qiao_bian_b_toc message, length delimited. Does not implicitly {@link skill_miao_bi_qiao_bian_b_toc.verify|verify} messages.
     * @param message skill_miao_bi_qiao_bian_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_miao_bi_qiao_bian_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_miao_bi_qiao_bian_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_miao_bi_qiao_bian_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_miao_bi_qiao_bian_b_toc;

    /**
     * Decodes a skill_miao_bi_qiao_bian_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_miao_bi_qiao_bian_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_miao_bi_qiao_bian_b_toc;

    /**
     * Verifies a skill_miao_bi_qiao_bian_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_miao_bi_qiao_bian_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_miao_bi_qiao_bian_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_miao_bi_qiao_bian_b_toc;

    /**
     * Creates a plain object from a skill_miao_bi_qiao_bian_b_toc message. Also converts values to other types if specified.
     * @param message skill_miao_bi_qiao_bian_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_miao_bi_qiao_bian_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_miao_bi_qiao_bian_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_miao_bi_qiao_bian_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_bi_a_tos. */
export class skill_jin_bi_a_tos implements Iskill_jin_bi_a_tos {

    /**
     * Constructs a new skill_jin_bi_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_bi_a_tos);

    /** skill_jin_bi_a_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jin_bi_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jin_bi_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_bi_a_tos instance
     */
    public static create(properties?: Iskill_jin_bi_a_tos): skill_jin_bi_a_tos;

    /**
     * Encodes the specified skill_jin_bi_a_tos message. Does not implicitly {@link skill_jin_bi_a_tos.verify|verify} messages.
     * @param message skill_jin_bi_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_bi_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_bi_a_tos message, length delimited. Does not implicitly {@link skill_jin_bi_a_tos.verify|verify} messages.
     * @param message skill_jin_bi_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_bi_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_bi_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_bi_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_bi_a_tos;

    /**
     * Decodes a skill_jin_bi_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_bi_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_bi_a_tos;

    /**
     * Verifies a skill_jin_bi_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_bi_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_bi_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_bi_a_tos;

    /**
     * Creates a plain object from a skill_jin_bi_a_tos message. Also converts values to other types if specified.
     * @param message skill_jin_bi_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_bi_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_bi_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_bi_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_bi_a_toc. */
export class skill_jin_bi_a_toc implements Iskill_jin_bi_a_toc {

    /**
     * Constructs a new skill_jin_bi_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_bi_a_toc);

    /** skill_jin_bi_a_toc playerId. */
    public playerId: number;

    /** skill_jin_bi_a_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jin_bi_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_jin_bi_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_jin_bi_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_bi_a_toc instance
     */
    public static create(properties?: Iskill_jin_bi_a_toc): skill_jin_bi_a_toc;

    /**
     * Encodes the specified skill_jin_bi_a_toc message. Does not implicitly {@link skill_jin_bi_a_toc.verify|verify} messages.
     * @param message skill_jin_bi_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_bi_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_bi_a_toc message, length delimited. Does not implicitly {@link skill_jin_bi_a_toc.verify|verify} messages.
     * @param message skill_jin_bi_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_bi_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_bi_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_bi_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_bi_a_toc;

    /**
     * Decodes a skill_jin_bi_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_bi_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_bi_a_toc;

    /**
     * Verifies a skill_jin_bi_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_bi_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_bi_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_bi_a_toc;

    /**
     * Creates a plain object from a skill_jin_bi_a_toc message. Also converts values to other types if specified.
     * @param message skill_jin_bi_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_bi_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_bi_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_bi_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_bi_b_tos. */
export class skill_jin_bi_b_tos implements Iskill_jin_bi_b_tos {

    /**
     * Constructs a new skill_jin_bi_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_bi_b_tos);

    /** skill_jin_bi_b_tos cardIds. */
    public cardIds: number[];

    /** skill_jin_bi_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jin_bi_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_bi_b_tos instance
     */
    public static create(properties?: Iskill_jin_bi_b_tos): skill_jin_bi_b_tos;

    /**
     * Encodes the specified skill_jin_bi_b_tos message. Does not implicitly {@link skill_jin_bi_b_tos.verify|verify} messages.
     * @param message skill_jin_bi_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_bi_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_bi_b_tos message, length delimited. Does not implicitly {@link skill_jin_bi_b_tos.verify|verify} messages.
     * @param message skill_jin_bi_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_bi_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_bi_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_bi_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_bi_b_tos;

    /**
     * Decodes a skill_jin_bi_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_bi_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_bi_b_tos;

    /**
     * Verifies a skill_jin_bi_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_bi_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_bi_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_bi_b_tos;

    /**
     * Creates a plain object from a skill_jin_bi_b_tos message. Also converts values to other types if specified.
     * @param message skill_jin_bi_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_bi_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_bi_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_bi_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_bi_b_toc. */
export class skill_jin_bi_b_toc implements Iskill_jin_bi_b_toc {

    /**
     * Constructs a new skill_jin_bi_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_bi_b_toc);

    /** skill_jin_bi_b_toc playerId. */
    public playerId: number;

    /** skill_jin_bi_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jin_bi_b_toc cards. */
    public cards: Icard[];

    /** skill_jin_bi_b_toc unknownCardCount. */
    public unknownCardCount: number;

    /**
     * Creates a new skill_jin_bi_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_bi_b_toc instance
     */
    public static create(properties?: Iskill_jin_bi_b_toc): skill_jin_bi_b_toc;

    /**
     * Encodes the specified skill_jin_bi_b_toc message. Does not implicitly {@link skill_jin_bi_b_toc.verify|verify} messages.
     * @param message skill_jin_bi_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_bi_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_bi_b_toc message, length delimited. Does not implicitly {@link skill_jin_bi_b_toc.verify|verify} messages.
     * @param message skill_jin_bi_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_bi_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_bi_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_bi_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_bi_b_toc;

    /**
     * Decodes a skill_jin_bi_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_bi_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_bi_b_toc;

    /**
     * Verifies a skill_jin_bi_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_bi_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_bi_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_bi_b_toc;

    /**
     * Creates a plain object from a skill_jin_bi_b_toc message. Also converts values to other types if specified.
     * @param message skill_jin_bi_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_bi_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_bi_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_bi_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_miao_shou_a_tos. */
export class skill_miao_shou_a_tos implements Iskill_miao_shou_a_tos {

    /**
     * Constructs a new skill_miao_shou_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_miao_shou_a_tos);

    /** skill_miao_shou_a_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_miao_shou_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_miao_shou_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_miao_shou_a_tos instance
     */
    public static create(properties?: Iskill_miao_shou_a_tos): skill_miao_shou_a_tos;

    /**
     * Encodes the specified skill_miao_shou_a_tos message. Does not implicitly {@link skill_miao_shou_a_tos.verify|verify} messages.
     * @param message skill_miao_shou_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_miao_shou_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_miao_shou_a_tos message, length delimited. Does not implicitly {@link skill_miao_shou_a_tos.verify|verify} messages.
     * @param message skill_miao_shou_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_miao_shou_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_miao_shou_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_miao_shou_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_miao_shou_a_tos;

    /**
     * Decodes a skill_miao_shou_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_miao_shou_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_miao_shou_a_tos;

    /**
     * Verifies a skill_miao_shou_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_miao_shou_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_miao_shou_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_miao_shou_a_tos;

    /**
     * Creates a plain object from a skill_miao_shou_a_tos message. Also converts values to other types if specified.
     * @param message skill_miao_shou_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_miao_shou_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_miao_shou_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_miao_shou_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_miao_shou_a_toc. */
export class skill_miao_shou_a_toc implements Iskill_miao_shou_a_toc {

    /**
     * Constructs a new skill_miao_shou_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_miao_shou_a_toc);

    /** skill_miao_shou_a_toc playerId. */
    public playerId: number;

    /** skill_miao_shou_a_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_miao_shou_a_toc cards. */
    public cards: Icard[];

    /** skill_miao_shou_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_miao_shou_a_toc seq. */
    public seq: number;

    /** skill_miao_shou_a_toc messageCard. */
    public messageCard?: (Icard|null);

    /**
     * Creates a new skill_miao_shou_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_miao_shou_a_toc instance
     */
    public static create(properties?: Iskill_miao_shou_a_toc): skill_miao_shou_a_toc;

    /**
     * Encodes the specified skill_miao_shou_a_toc message. Does not implicitly {@link skill_miao_shou_a_toc.verify|verify} messages.
     * @param message skill_miao_shou_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_miao_shou_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_miao_shou_a_toc message, length delimited. Does not implicitly {@link skill_miao_shou_a_toc.verify|verify} messages.
     * @param message skill_miao_shou_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_miao_shou_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_miao_shou_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_miao_shou_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_miao_shou_a_toc;

    /**
     * Decodes a skill_miao_shou_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_miao_shou_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_miao_shou_a_toc;

    /**
     * Verifies a skill_miao_shou_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_miao_shou_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_miao_shou_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_miao_shou_a_toc;

    /**
     * Creates a plain object from a skill_miao_shou_a_toc message. Also converts values to other types if specified.
     * @param message skill_miao_shou_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_miao_shou_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_miao_shou_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_miao_shou_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_miao_shou_b_tos. */
export class skill_miao_shou_b_tos implements Iskill_miao_shou_b_tos {

    /**
     * Constructs a new skill_miao_shou_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_miao_shou_b_tos);

    /** skill_miao_shou_b_tos cardId. */
    public cardId: number;

    /** skill_miao_shou_b_tos messageCardId. */
    public messageCardId: number;

    /** skill_miao_shou_b_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_miao_shou_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_miao_shou_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_miao_shou_b_tos instance
     */
    public static create(properties?: Iskill_miao_shou_b_tos): skill_miao_shou_b_tos;

    /**
     * Encodes the specified skill_miao_shou_b_tos message. Does not implicitly {@link skill_miao_shou_b_tos.verify|verify} messages.
     * @param message skill_miao_shou_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_miao_shou_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_miao_shou_b_tos message, length delimited. Does not implicitly {@link skill_miao_shou_b_tos.verify|verify} messages.
     * @param message skill_miao_shou_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_miao_shou_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_miao_shou_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_miao_shou_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_miao_shou_b_tos;

    /**
     * Decodes a skill_miao_shou_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_miao_shou_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_miao_shou_b_tos;

    /**
     * Verifies a skill_miao_shou_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_miao_shou_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_miao_shou_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_miao_shou_b_tos;

    /**
     * Creates a plain object from a skill_miao_shou_b_tos message. Also converts values to other types if specified.
     * @param message skill_miao_shou_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_miao_shou_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_miao_shou_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_miao_shou_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_miao_shou_b_toc. */
export class skill_miao_shou_b_toc implements Iskill_miao_shou_b_toc {

    /**
     * Constructs a new skill_miao_shou_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_miao_shou_b_toc);

    /** skill_miao_shou_b_toc playerId. */
    public playerId: number;

    /** skill_miao_shou_b_toc fromPlayerId. */
    public fromPlayerId: number;

    /** skill_miao_shou_b_toc card. */
    public card?: (Icard|null);

    /** skill_miao_shou_b_toc messageCardId. */
    public messageCardId: number;

    /** skill_miao_shou_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /**
     * Creates a new skill_miao_shou_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_miao_shou_b_toc instance
     */
    public static create(properties?: Iskill_miao_shou_b_toc): skill_miao_shou_b_toc;

    /**
     * Encodes the specified skill_miao_shou_b_toc message. Does not implicitly {@link skill_miao_shou_b_toc.verify|verify} messages.
     * @param message skill_miao_shou_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_miao_shou_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_miao_shou_b_toc message, length delimited. Does not implicitly {@link skill_miao_shou_b_toc.verify|verify} messages.
     * @param message skill_miao_shou_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_miao_shou_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_miao_shou_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_miao_shou_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_miao_shou_b_toc;

    /**
     * Decodes a skill_miao_shou_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_miao_shou_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_miao_shou_b_toc;

    /**
     * Verifies a skill_miao_shou_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_miao_shou_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_miao_shou_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_miao_shou_b_toc;

    /**
     * Creates a plain object from a skill_miao_shou_b_toc message. Also converts values to other types if specified.
     * @param message skill_miao_shou_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_miao_shou_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_miao_shou_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_miao_shou_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_kou_yi_kai_a_tos. */
export class skill_jin_kou_yi_kai_a_tos implements Iskill_jin_kou_yi_kai_a_tos {

    /**
     * Constructs a new skill_jin_kou_yi_kai_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_kou_yi_kai_a_tos);

    /** skill_jin_kou_yi_kai_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jin_kou_yi_kai_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_kou_yi_kai_a_tos instance
     */
    public static create(properties?: Iskill_jin_kou_yi_kai_a_tos): skill_jin_kou_yi_kai_a_tos;

    /**
     * Encodes the specified skill_jin_kou_yi_kai_a_tos message. Does not implicitly {@link skill_jin_kou_yi_kai_a_tos.verify|verify} messages.
     * @param message skill_jin_kou_yi_kai_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_kou_yi_kai_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_kou_yi_kai_a_tos message, length delimited. Does not implicitly {@link skill_jin_kou_yi_kai_a_tos.verify|verify} messages.
     * @param message skill_jin_kou_yi_kai_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_kou_yi_kai_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_kou_yi_kai_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_kou_yi_kai_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_kou_yi_kai_a_tos;

    /**
     * Decodes a skill_jin_kou_yi_kai_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_kou_yi_kai_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_kou_yi_kai_a_tos;

    /**
     * Verifies a skill_jin_kou_yi_kai_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_kou_yi_kai_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_kou_yi_kai_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_kou_yi_kai_a_tos;

    /**
     * Creates a plain object from a skill_jin_kou_yi_kai_a_tos message. Also converts values to other types if specified.
     * @param message skill_jin_kou_yi_kai_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_kou_yi_kai_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_kou_yi_kai_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_kou_yi_kai_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_kou_yi_kai_a_toc. */
export class skill_jin_kou_yi_kai_a_toc implements Iskill_jin_kou_yi_kai_a_toc {

    /**
     * Constructs a new skill_jin_kou_yi_kai_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_kou_yi_kai_a_toc);

    /** skill_jin_kou_yi_kai_a_toc playerId. */
    public playerId: number;

    /** skill_jin_kou_yi_kai_a_toc card. */
    public card?: (Icard|null);

    /** skill_jin_kou_yi_kai_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_jin_kou_yi_kai_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_jin_kou_yi_kai_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_kou_yi_kai_a_toc instance
     */
    public static create(properties?: Iskill_jin_kou_yi_kai_a_toc): skill_jin_kou_yi_kai_a_toc;

    /**
     * Encodes the specified skill_jin_kou_yi_kai_a_toc message. Does not implicitly {@link skill_jin_kou_yi_kai_a_toc.verify|verify} messages.
     * @param message skill_jin_kou_yi_kai_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_kou_yi_kai_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_kou_yi_kai_a_toc message, length delimited. Does not implicitly {@link skill_jin_kou_yi_kai_a_toc.verify|verify} messages.
     * @param message skill_jin_kou_yi_kai_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_kou_yi_kai_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_kou_yi_kai_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_kou_yi_kai_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_kou_yi_kai_a_toc;

    /**
     * Decodes a skill_jin_kou_yi_kai_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_kou_yi_kai_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_kou_yi_kai_a_toc;

    /**
     * Verifies a skill_jin_kou_yi_kai_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_kou_yi_kai_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_kou_yi_kai_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_kou_yi_kai_a_toc;

    /**
     * Creates a plain object from a skill_jin_kou_yi_kai_a_toc message. Also converts values to other types if specified.
     * @param message skill_jin_kou_yi_kai_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_kou_yi_kai_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_kou_yi_kai_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_kou_yi_kai_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_kou_yi_kai_b_tos. */
export class skill_jin_kou_yi_kai_b_tos implements Iskill_jin_kou_yi_kai_b_tos {

    /**
     * Constructs a new skill_jin_kou_yi_kai_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_kou_yi_kai_b_tos);

    /** skill_jin_kou_yi_kai_b_tos exchange. */
    public exchange: boolean;

    /** skill_jin_kou_yi_kai_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jin_kou_yi_kai_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_kou_yi_kai_b_tos instance
     */
    public static create(properties?: Iskill_jin_kou_yi_kai_b_tos): skill_jin_kou_yi_kai_b_tos;

    /**
     * Encodes the specified skill_jin_kou_yi_kai_b_tos message. Does not implicitly {@link skill_jin_kou_yi_kai_b_tos.verify|verify} messages.
     * @param message skill_jin_kou_yi_kai_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_kou_yi_kai_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_kou_yi_kai_b_tos message, length delimited. Does not implicitly {@link skill_jin_kou_yi_kai_b_tos.verify|verify} messages.
     * @param message skill_jin_kou_yi_kai_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_kou_yi_kai_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_kou_yi_kai_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_kou_yi_kai_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_kou_yi_kai_b_tos;

    /**
     * Decodes a skill_jin_kou_yi_kai_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_kou_yi_kai_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_kou_yi_kai_b_tos;

    /**
     * Verifies a skill_jin_kou_yi_kai_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_kou_yi_kai_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_kou_yi_kai_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_kou_yi_kai_b_tos;

    /**
     * Creates a plain object from a skill_jin_kou_yi_kai_b_tos message. Also converts values to other types if specified.
     * @param message skill_jin_kou_yi_kai_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_kou_yi_kai_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_kou_yi_kai_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_kou_yi_kai_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jin_kou_yi_kai_b_toc. */
export class skill_jin_kou_yi_kai_b_toc implements Iskill_jin_kou_yi_kai_b_toc {

    /**
     * Constructs a new skill_jin_kou_yi_kai_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jin_kou_yi_kai_b_toc);

    /** skill_jin_kou_yi_kai_b_toc playerId. */
    public playerId: number;

    /** skill_jin_kou_yi_kai_b_toc exchange. */
    public exchange: boolean;

    /**
     * Creates a new skill_jin_kou_yi_kai_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jin_kou_yi_kai_b_toc instance
     */
    public static create(properties?: Iskill_jin_kou_yi_kai_b_toc): skill_jin_kou_yi_kai_b_toc;

    /**
     * Encodes the specified skill_jin_kou_yi_kai_b_toc message. Does not implicitly {@link skill_jin_kou_yi_kai_b_toc.verify|verify} messages.
     * @param message skill_jin_kou_yi_kai_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jin_kou_yi_kai_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jin_kou_yi_kai_b_toc message, length delimited. Does not implicitly {@link skill_jin_kou_yi_kai_b_toc.verify|verify} messages.
     * @param message skill_jin_kou_yi_kai_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jin_kou_yi_kai_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jin_kou_yi_kai_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jin_kou_yi_kai_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jin_kou_yi_kai_b_toc;

    /**
     * Decodes a skill_jin_kou_yi_kai_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jin_kou_yi_kai_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jin_kou_yi_kai_b_toc;

    /**
     * Verifies a skill_jin_kou_yi_kai_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jin_kou_yi_kai_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jin_kou_yi_kai_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jin_kou_yi_kai_b_toc;

    /**
     * Creates a plain object from a skill_jin_kou_yi_kai_b_toc message. Also converts values to other types if specified.
     * @param message skill_jin_kou_yi_kai_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jin_kou_yi_kai_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jin_kou_yi_kai_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jin_kou_yi_kai_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_jiang_hu_ling_a_toc. */
export class skill_wait_for_jiang_hu_ling_a_toc implements Iskill_wait_for_jiang_hu_ling_a_toc {

    /**
     * Constructs a new skill_wait_for_jiang_hu_ling_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_jiang_hu_ling_a_toc);

    /** skill_wait_for_jiang_hu_ling_a_toc playerId. */
    public playerId: number;

    /** skill_wait_for_jiang_hu_ling_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_jiang_hu_ling_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_jiang_hu_ling_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_jiang_hu_ling_a_toc instance
     */
    public static create(properties?: Iskill_wait_for_jiang_hu_ling_a_toc): skill_wait_for_jiang_hu_ling_a_toc;

    /**
     * Encodes the specified skill_wait_for_jiang_hu_ling_a_toc message. Does not implicitly {@link skill_wait_for_jiang_hu_ling_a_toc.verify|verify} messages.
     * @param message skill_wait_for_jiang_hu_ling_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_jiang_hu_ling_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_jiang_hu_ling_a_toc message, length delimited. Does not implicitly {@link skill_wait_for_jiang_hu_ling_a_toc.verify|verify} messages.
     * @param message skill_wait_for_jiang_hu_ling_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_jiang_hu_ling_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_jiang_hu_ling_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_jiang_hu_ling_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_jiang_hu_ling_a_toc;

    /**
     * Decodes a skill_wait_for_jiang_hu_ling_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_jiang_hu_ling_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_jiang_hu_ling_a_toc;

    /**
     * Verifies a skill_wait_for_jiang_hu_ling_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_jiang_hu_ling_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_jiang_hu_ling_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_jiang_hu_ling_a_toc;

    /**
     * Creates a plain object from a skill_wait_for_jiang_hu_ling_a_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_jiang_hu_ling_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_jiang_hu_ling_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_jiang_hu_ling_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_jiang_hu_ling_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiang_hu_ling_a_tos. */
export class skill_jiang_hu_ling_a_tos implements Iskill_jiang_hu_ling_a_tos {

    /**
     * Constructs a new skill_jiang_hu_ling_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiang_hu_ling_a_tos);

    /** skill_jiang_hu_ling_a_tos enable. */
    public enable: boolean;

    /** skill_jiang_hu_ling_a_tos color. */
    public color: color;

    /** skill_jiang_hu_ling_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jiang_hu_ling_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiang_hu_ling_a_tos instance
     */
    public static create(properties?: Iskill_jiang_hu_ling_a_tos): skill_jiang_hu_ling_a_tos;

    /**
     * Encodes the specified skill_jiang_hu_ling_a_tos message. Does not implicitly {@link skill_jiang_hu_ling_a_tos.verify|verify} messages.
     * @param message skill_jiang_hu_ling_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiang_hu_ling_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiang_hu_ling_a_tos message, length delimited. Does not implicitly {@link skill_jiang_hu_ling_a_tos.verify|verify} messages.
     * @param message skill_jiang_hu_ling_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiang_hu_ling_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiang_hu_ling_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiang_hu_ling_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiang_hu_ling_a_tos;

    /**
     * Decodes a skill_jiang_hu_ling_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiang_hu_ling_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiang_hu_ling_a_tos;

    /**
     * Verifies a skill_jiang_hu_ling_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiang_hu_ling_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiang_hu_ling_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jiang_hu_ling_a_tos;

    /**
     * Creates a plain object from a skill_jiang_hu_ling_a_tos message. Also converts values to other types if specified.
     * @param message skill_jiang_hu_ling_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiang_hu_ling_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiang_hu_ling_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiang_hu_ling_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiang_hu_ling_a_toc. */
export class skill_jiang_hu_ling_a_toc implements Iskill_jiang_hu_ling_a_toc {

    /**
     * Constructs a new skill_jiang_hu_ling_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiang_hu_ling_a_toc);

    /** skill_jiang_hu_ling_a_toc playerId. */
    public playerId: number;

    /** skill_jiang_hu_ling_a_toc color. */
    public color: color;

    /**
     * Creates a new skill_jiang_hu_ling_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiang_hu_ling_a_toc instance
     */
    public static create(properties?: Iskill_jiang_hu_ling_a_toc): skill_jiang_hu_ling_a_toc;

    /**
     * Encodes the specified skill_jiang_hu_ling_a_toc message. Does not implicitly {@link skill_jiang_hu_ling_a_toc.verify|verify} messages.
     * @param message skill_jiang_hu_ling_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiang_hu_ling_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiang_hu_ling_a_toc message, length delimited. Does not implicitly {@link skill_jiang_hu_ling_a_toc.verify|verify} messages.
     * @param message skill_jiang_hu_ling_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiang_hu_ling_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiang_hu_ling_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiang_hu_ling_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiang_hu_ling_a_toc;

    /**
     * Decodes a skill_jiang_hu_ling_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiang_hu_ling_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiang_hu_ling_a_toc;

    /**
     * Verifies a skill_jiang_hu_ling_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiang_hu_ling_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiang_hu_ling_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jiang_hu_ling_a_toc;

    /**
     * Creates a plain object from a skill_jiang_hu_ling_a_toc message. Also converts values to other types if specified.
     * @param message skill_jiang_hu_ling_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiang_hu_ling_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiang_hu_ling_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiang_hu_ling_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_jiang_hu_ling_b_toc. */
export class skill_wait_for_jiang_hu_ling_b_toc implements Iskill_wait_for_jiang_hu_ling_b_toc {

    /**
     * Constructs a new skill_wait_for_jiang_hu_ling_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_jiang_hu_ling_b_toc);

    /** skill_wait_for_jiang_hu_ling_b_toc playerId. */
    public playerId: number;

    /** skill_wait_for_jiang_hu_ling_b_toc color. */
    public color: color;

    /** skill_wait_for_jiang_hu_ling_b_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_jiang_hu_ling_b_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_jiang_hu_ling_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_jiang_hu_ling_b_toc instance
     */
    public static create(properties?: Iskill_wait_for_jiang_hu_ling_b_toc): skill_wait_for_jiang_hu_ling_b_toc;

    /**
     * Encodes the specified skill_wait_for_jiang_hu_ling_b_toc message. Does not implicitly {@link skill_wait_for_jiang_hu_ling_b_toc.verify|verify} messages.
     * @param message skill_wait_for_jiang_hu_ling_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_jiang_hu_ling_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_jiang_hu_ling_b_toc message, length delimited. Does not implicitly {@link skill_wait_for_jiang_hu_ling_b_toc.verify|verify} messages.
     * @param message skill_wait_for_jiang_hu_ling_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_jiang_hu_ling_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_jiang_hu_ling_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_jiang_hu_ling_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_jiang_hu_ling_b_toc;

    /**
     * Decodes a skill_wait_for_jiang_hu_ling_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_jiang_hu_ling_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_jiang_hu_ling_b_toc;

    /**
     * Verifies a skill_wait_for_jiang_hu_ling_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_jiang_hu_ling_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_jiang_hu_ling_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_jiang_hu_ling_b_toc;

    /**
     * Creates a plain object from a skill_wait_for_jiang_hu_ling_b_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_jiang_hu_ling_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_jiang_hu_ling_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_jiang_hu_ling_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_jiang_hu_ling_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiang_hu_ling_b_tos. */
export class skill_jiang_hu_ling_b_tos implements Iskill_jiang_hu_ling_b_tos {

    /**
     * Constructs a new skill_jiang_hu_ling_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiang_hu_ling_b_tos);

    /** skill_jiang_hu_ling_b_tos cardId. */
    public cardId: number;

    /** skill_jiang_hu_ling_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jiang_hu_ling_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiang_hu_ling_b_tos instance
     */
    public static create(properties?: Iskill_jiang_hu_ling_b_tos): skill_jiang_hu_ling_b_tos;

    /**
     * Encodes the specified skill_jiang_hu_ling_b_tos message. Does not implicitly {@link skill_jiang_hu_ling_b_tos.verify|verify} messages.
     * @param message skill_jiang_hu_ling_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiang_hu_ling_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiang_hu_ling_b_tos message, length delimited. Does not implicitly {@link skill_jiang_hu_ling_b_tos.verify|verify} messages.
     * @param message skill_jiang_hu_ling_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiang_hu_ling_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiang_hu_ling_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiang_hu_ling_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiang_hu_ling_b_tos;

    /**
     * Decodes a skill_jiang_hu_ling_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiang_hu_ling_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiang_hu_ling_b_tos;

    /**
     * Verifies a skill_jiang_hu_ling_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiang_hu_ling_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiang_hu_ling_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jiang_hu_ling_b_tos;

    /**
     * Creates a plain object from a skill_jiang_hu_ling_b_tos message. Also converts values to other types if specified.
     * @param message skill_jiang_hu_ling_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiang_hu_ling_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiang_hu_ling_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiang_hu_ling_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jiang_hu_ling_b_toc. */
export class skill_jiang_hu_ling_b_toc implements Iskill_jiang_hu_ling_b_toc {

    /**
     * Constructs a new skill_jiang_hu_ling_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jiang_hu_ling_b_toc);

    /** skill_jiang_hu_ling_b_toc playerId. */
    public playerId: number;

    /** skill_jiang_hu_ling_b_toc cardId. */
    public cardId: number;

    /**
     * Creates a new skill_jiang_hu_ling_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jiang_hu_ling_b_toc instance
     */
    public static create(properties?: Iskill_jiang_hu_ling_b_toc): skill_jiang_hu_ling_b_toc;

    /**
     * Encodes the specified skill_jiang_hu_ling_b_toc message. Does not implicitly {@link skill_jiang_hu_ling_b_toc.verify|verify} messages.
     * @param message skill_jiang_hu_ling_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jiang_hu_ling_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jiang_hu_ling_b_toc message, length delimited. Does not implicitly {@link skill_jiang_hu_ling_b_toc.verify|verify} messages.
     * @param message skill_jiang_hu_ling_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jiang_hu_ling_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jiang_hu_ling_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jiang_hu_ling_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jiang_hu_ling_b_toc;

    /**
     * Decodes a skill_jiang_hu_ling_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jiang_hu_ling_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jiang_hu_ling_b_toc;

    /**
     * Verifies a skill_jiang_hu_ling_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jiang_hu_ling_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jiang_hu_ling_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jiang_hu_ling_b_toc;

    /**
     * Creates a plain object from a skill_jiang_hu_ling_b_toc message. Also converts values to other types if specified.
     * @param message skill_jiang_hu_ling_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jiang_hu_ling_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jiang_hu_ling_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jiang_hu_ling_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ji_ban_a_tos. */
export class skill_ji_ban_a_tos implements Iskill_ji_ban_a_tos {

    /**
     * Constructs a new skill_ji_ban_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ji_ban_a_tos);

    /** skill_ji_ban_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_ji_ban_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ji_ban_a_tos instance
     */
    public static create(properties?: Iskill_ji_ban_a_tos): skill_ji_ban_a_tos;

    /**
     * Encodes the specified skill_ji_ban_a_tos message. Does not implicitly {@link skill_ji_ban_a_tos.verify|verify} messages.
     * @param message skill_ji_ban_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ji_ban_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ji_ban_a_tos message, length delimited. Does not implicitly {@link skill_ji_ban_a_tos.verify|verify} messages.
     * @param message skill_ji_ban_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ji_ban_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ji_ban_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ji_ban_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ji_ban_a_tos;

    /**
     * Decodes a skill_ji_ban_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ji_ban_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ji_ban_a_tos;

    /**
     * Verifies a skill_ji_ban_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ji_ban_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ji_ban_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_ji_ban_a_tos;

    /**
     * Creates a plain object from a skill_ji_ban_a_tos message. Also converts values to other types if specified.
     * @param message skill_ji_ban_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ji_ban_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ji_ban_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ji_ban_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ji_ban_a_toc. */
export class skill_ji_ban_a_toc implements Iskill_ji_ban_a_toc {

    /**
     * Constructs a new skill_ji_ban_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ji_ban_a_toc);

    /** skill_ji_ban_a_toc playerId. */
    public playerId: number;

    /** skill_ji_ban_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_ji_ban_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_ji_ban_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ji_ban_a_toc instance
     */
    public static create(properties?: Iskill_ji_ban_a_toc): skill_ji_ban_a_toc;

    /**
     * Encodes the specified skill_ji_ban_a_toc message. Does not implicitly {@link skill_ji_ban_a_toc.verify|verify} messages.
     * @param message skill_ji_ban_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ji_ban_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ji_ban_a_toc message, length delimited. Does not implicitly {@link skill_ji_ban_a_toc.verify|verify} messages.
     * @param message skill_ji_ban_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ji_ban_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ji_ban_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ji_ban_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ji_ban_a_toc;

    /**
     * Decodes a skill_ji_ban_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ji_ban_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ji_ban_a_toc;

    /**
     * Verifies a skill_ji_ban_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ji_ban_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ji_ban_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_ji_ban_a_toc;

    /**
     * Creates a plain object from a skill_ji_ban_a_toc message. Also converts values to other types if specified.
     * @param message skill_ji_ban_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ji_ban_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ji_ban_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ji_ban_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ji_ban_b_tos. */
export class skill_ji_ban_b_tos implements Iskill_ji_ban_b_tos {

    /**
     * Constructs a new skill_ji_ban_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ji_ban_b_tos);

    /** skill_ji_ban_b_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_ji_ban_b_tos cardIds. */
    public cardIds: number[];

    /** skill_ji_ban_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_ji_ban_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ji_ban_b_tos instance
     */
    public static create(properties?: Iskill_ji_ban_b_tos): skill_ji_ban_b_tos;

    /**
     * Encodes the specified skill_ji_ban_b_tos message. Does not implicitly {@link skill_ji_ban_b_tos.verify|verify} messages.
     * @param message skill_ji_ban_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ji_ban_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ji_ban_b_tos message, length delimited. Does not implicitly {@link skill_ji_ban_b_tos.verify|verify} messages.
     * @param message skill_ji_ban_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ji_ban_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ji_ban_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ji_ban_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ji_ban_b_tos;

    /**
     * Decodes a skill_ji_ban_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ji_ban_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ji_ban_b_tos;

    /**
     * Verifies a skill_ji_ban_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ji_ban_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ji_ban_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_ji_ban_b_tos;

    /**
     * Creates a plain object from a skill_ji_ban_b_tos message. Also converts values to other types if specified.
     * @param message skill_ji_ban_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ji_ban_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ji_ban_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ji_ban_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_ji_ban_b_toc. */
export class skill_ji_ban_b_toc implements Iskill_ji_ban_b_toc {

    /**
     * Constructs a new skill_ji_ban_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_ji_ban_b_toc);

    /** skill_ji_ban_b_toc playerId. */
    public playerId: number;

    /** skill_ji_ban_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_ji_ban_b_toc cards. */
    public cards: Icard[];

    /** skill_ji_ban_b_toc unknownCardCount. */
    public unknownCardCount: number;

    /**
     * Creates a new skill_ji_ban_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_ji_ban_b_toc instance
     */
    public static create(properties?: Iskill_ji_ban_b_toc): skill_ji_ban_b_toc;

    /**
     * Encodes the specified skill_ji_ban_b_toc message. Does not implicitly {@link skill_ji_ban_b_toc.verify|verify} messages.
     * @param message skill_ji_ban_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_ji_ban_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_ji_ban_b_toc message, length delimited. Does not implicitly {@link skill_ji_ban_b_toc.verify|verify} messages.
     * @param message skill_ji_ban_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_ji_ban_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_ji_ban_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_ji_ban_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_ji_ban_b_toc;

    /**
     * Decodes a skill_ji_ban_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_ji_ban_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_ji_ban_b_toc;

    /**
     * Verifies a skill_ji_ban_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_ji_ban_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_ji_ban_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_ji_ban_b_toc;

    /**
     * Creates a plain object from a skill_ji_ban_b_toc message. Also converts values to other types if specified.
     * @param message skill_ji_ban_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_ji_ban_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_ji_ban_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_ji_ban_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_you_dao_toc. */
export class skill_you_dao_toc implements Iskill_you_dao_toc {

    /**
     * Constructs a new skill_you_dao_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_you_dao_toc);

    /** skill_you_dao_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_you_dao_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_you_dao_toc instance
     */
    public static create(properties?: Iskill_you_dao_toc): skill_you_dao_toc;

    /**
     * Encodes the specified skill_you_dao_toc message. Does not implicitly {@link skill_you_dao_toc.verify|verify} messages.
     * @param message skill_you_dao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_you_dao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_you_dao_toc message, length delimited. Does not implicitly {@link skill_you_dao_toc.verify|verify} messages.
     * @param message skill_you_dao_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_you_dao_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_you_dao_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_you_dao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_you_dao_toc;

    /**
     * Decodes a skill_you_dao_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_you_dao_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_you_dao_toc;

    /**
     * Verifies a skill_you_dao_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_you_dao_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_you_dao_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_you_dao_toc;

    /**
     * Creates a plain object from a skill_you_dao_toc message. Also converts values to other types if specified.
     * @param message skill_you_dao_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_you_dao_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_you_dao_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_you_dao_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_bo_ai_a_tos. */
export class skill_bo_ai_a_tos implements Iskill_bo_ai_a_tos {

    /**
     * Constructs a new skill_bo_ai_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_bo_ai_a_tos);

    /** skill_bo_ai_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_bo_ai_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_bo_ai_a_tos instance
     */
    public static create(properties?: Iskill_bo_ai_a_tos): skill_bo_ai_a_tos;

    /**
     * Encodes the specified skill_bo_ai_a_tos message. Does not implicitly {@link skill_bo_ai_a_tos.verify|verify} messages.
     * @param message skill_bo_ai_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_bo_ai_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_bo_ai_a_tos message, length delimited. Does not implicitly {@link skill_bo_ai_a_tos.verify|verify} messages.
     * @param message skill_bo_ai_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_bo_ai_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_bo_ai_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_bo_ai_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_bo_ai_a_tos;

    /**
     * Decodes a skill_bo_ai_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_bo_ai_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_bo_ai_a_tos;

    /**
     * Verifies a skill_bo_ai_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_bo_ai_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_bo_ai_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_bo_ai_a_tos;

    /**
     * Creates a plain object from a skill_bo_ai_a_tos message. Also converts values to other types if specified.
     * @param message skill_bo_ai_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_bo_ai_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_bo_ai_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_bo_ai_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_bo_ai_a_toc. */
export class skill_bo_ai_a_toc implements Iskill_bo_ai_a_toc {

    /**
     * Constructs a new skill_bo_ai_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_bo_ai_a_toc);

    /** skill_bo_ai_a_toc playerId. */
    public playerId: number;

    /** skill_bo_ai_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_bo_ai_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_bo_ai_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_bo_ai_a_toc instance
     */
    public static create(properties?: Iskill_bo_ai_a_toc): skill_bo_ai_a_toc;

    /**
     * Encodes the specified skill_bo_ai_a_toc message. Does not implicitly {@link skill_bo_ai_a_toc.verify|verify} messages.
     * @param message skill_bo_ai_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_bo_ai_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_bo_ai_a_toc message, length delimited. Does not implicitly {@link skill_bo_ai_a_toc.verify|verify} messages.
     * @param message skill_bo_ai_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_bo_ai_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_bo_ai_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_bo_ai_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_bo_ai_a_toc;

    /**
     * Decodes a skill_bo_ai_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_bo_ai_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_bo_ai_a_toc;

    /**
     * Verifies a skill_bo_ai_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_bo_ai_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_bo_ai_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_bo_ai_a_toc;

    /**
     * Creates a plain object from a skill_bo_ai_a_toc message. Also converts values to other types if specified.
     * @param message skill_bo_ai_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_bo_ai_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_bo_ai_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_bo_ai_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_bo_ai_b_tos. */
export class skill_bo_ai_b_tos implements Iskill_bo_ai_b_tos {

    /**
     * Constructs a new skill_bo_ai_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_bo_ai_b_tos);

    /** skill_bo_ai_b_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_bo_ai_b_tos cardId. */
    public cardId: number;

    /** skill_bo_ai_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_bo_ai_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_bo_ai_b_tos instance
     */
    public static create(properties?: Iskill_bo_ai_b_tos): skill_bo_ai_b_tos;

    /**
     * Encodes the specified skill_bo_ai_b_tos message. Does not implicitly {@link skill_bo_ai_b_tos.verify|verify} messages.
     * @param message skill_bo_ai_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_bo_ai_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_bo_ai_b_tos message, length delimited. Does not implicitly {@link skill_bo_ai_b_tos.verify|verify} messages.
     * @param message skill_bo_ai_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_bo_ai_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_bo_ai_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_bo_ai_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_bo_ai_b_tos;

    /**
     * Decodes a skill_bo_ai_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_bo_ai_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_bo_ai_b_tos;

    /**
     * Verifies a skill_bo_ai_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_bo_ai_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_bo_ai_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_bo_ai_b_tos;

    /**
     * Creates a plain object from a skill_bo_ai_b_tos message. Also converts values to other types if specified.
     * @param message skill_bo_ai_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_bo_ai_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_bo_ai_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_bo_ai_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_bo_ai_b_toc. */
export class skill_bo_ai_b_toc implements Iskill_bo_ai_b_toc {

    /**
     * Constructs a new skill_bo_ai_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_bo_ai_b_toc);

    /** skill_bo_ai_b_toc playerId. */
    public playerId: number;

    /** skill_bo_ai_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_bo_ai_b_toc card. */
    public card?: (Icard|null);

    /**
     * Creates a new skill_bo_ai_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_bo_ai_b_toc instance
     */
    public static create(properties?: Iskill_bo_ai_b_toc): skill_bo_ai_b_toc;

    /**
     * Encodes the specified skill_bo_ai_b_toc message. Does not implicitly {@link skill_bo_ai_b_toc.verify|verify} messages.
     * @param message skill_bo_ai_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_bo_ai_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_bo_ai_b_toc message, length delimited. Does not implicitly {@link skill_bo_ai_b_toc.verify|verify} messages.
     * @param message skill_bo_ai_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_bo_ai_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_bo_ai_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_bo_ai_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_bo_ai_b_toc;

    /**
     * Decodes a skill_bo_ai_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_bo_ai_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_bo_ai_b_toc;

    /**
     * Verifies a skill_bo_ai_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_bo_ai_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_bo_ai_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_bo_ai_b_toc;

    /**
     * Creates a plain object from a skill_bo_ai_b_toc message. Also converts values to other types if specified.
     * @param message skill_bo_ai_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_bo_ai_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_bo_ai_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_bo_ai_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_guang_fa_bao_a_tos. */
export class skill_guang_fa_bao_a_tos implements Iskill_guang_fa_bao_a_tos {

    /**
     * Constructs a new skill_guang_fa_bao_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_guang_fa_bao_a_tos);

    /** skill_guang_fa_bao_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_guang_fa_bao_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_guang_fa_bao_a_tos instance
     */
    public static create(properties?: Iskill_guang_fa_bao_a_tos): skill_guang_fa_bao_a_tos;

    /**
     * Encodes the specified skill_guang_fa_bao_a_tos message. Does not implicitly {@link skill_guang_fa_bao_a_tos.verify|verify} messages.
     * @param message skill_guang_fa_bao_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_guang_fa_bao_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_guang_fa_bao_a_tos message, length delimited. Does not implicitly {@link skill_guang_fa_bao_a_tos.verify|verify} messages.
     * @param message skill_guang_fa_bao_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_guang_fa_bao_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_guang_fa_bao_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_guang_fa_bao_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_guang_fa_bao_a_tos;

    /**
     * Decodes a skill_guang_fa_bao_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_guang_fa_bao_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_guang_fa_bao_a_tos;

    /**
     * Verifies a skill_guang_fa_bao_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_guang_fa_bao_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_guang_fa_bao_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_guang_fa_bao_a_tos;

    /**
     * Creates a plain object from a skill_guang_fa_bao_a_tos message. Also converts values to other types if specified.
     * @param message skill_guang_fa_bao_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_guang_fa_bao_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_guang_fa_bao_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_guang_fa_bao_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_guang_fa_bao_a_toc. */
export class skill_guang_fa_bao_a_toc implements Iskill_guang_fa_bao_a_toc {

    /**
     * Constructs a new skill_guang_fa_bao_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_guang_fa_bao_a_toc);

    /** skill_guang_fa_bao_a_toc playerId. */
    public playerId: number;

    /**
     * Creates a new skill_guang_fa_bao_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_guang_fa_bao_a_toc instance
     */
    public static create(properties?: Iskill_guang_fa_bao_a_toc): skill_guang_fa_bao_a_toc;

    /**
     * Encodes the specified skill_guang_fa_bao_a_toc message. Does not implicitly {@link skill_guang_fa_bao_a_toc.verify|verify} messages.
     * @param message skill_guang_fa_bao_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_guang_fa_bao_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_guang_fa_bao_a_toc message, length delimited. Does not implicitly {@link skill_guang_fa_bao_a_toc.verify|verify} messages.
     * @param message skill_guang_fa_bao_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_guang_fa_bao_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_guang_fa_bao_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_guang_fa_bao_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_guang_fa_bao_a_toc;

    /**
     * Decodes a skill_guang_fa_bao_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_guang_fa_bao_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_guang_fa_bao_a_toc;

    /**
     * Verifies a skill_guang_fa_bao_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_guang_fa_bao_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_guang_fa_bao_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_guang_fa_bao_a_toc;

    /**
     * Creates a plain object from a skill_guang_fa_bao_a_toc message. Also converts values to other types if specified.
     * @param message skill_guang_fa_bao_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_guang_fa_bao_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_guang_fa_bao_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_guang_fa_bao_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_guang_fa_bao_b_toc. */
export class skill_wait_for_guang_fa_bao_b_toc implements Iskill_wait_for_guang_fa_bao_b_toc {

    /**
     * Constructs a new skill_wait_for_guang_fa_bao_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_guang_fa_bao_b_toc);

    /** skill_wait_for_guang_fa_bao_b_toc playerId. */
    public playerId: number;

    /** skill_wait_for_guang_fa_bao_b_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_guang_fa_bao_b_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_guang_fa_bao_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_guang_fa_bao_b_toc instance
     */
    public static create(properties?: Iskill_wait_for_guang_fa_bao_b_toc): skill_wait_for_guang_fa_bao_b_toc;

    /**
     * Encodes the specified skill_wait_for_guang_fa_bao_b_toc message. Does not implicitly {@link skill_wait_for_guang_fa_bao_b_toc.verify|verify} messages.
     * @param message skill_wait_for_guang_fa_bao_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_guang_fa_bao_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_guang_fa_bao_b_toc message, length delimited. Does not implicitly {@link skill_wait_for_guang_fa_bao_b_toc.verify|verify} messages.
     * @param message skill_wait_for_guang_fa_bao_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_guang_fa_bao_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_guang_fa_bao_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_guang_fa_bao_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_guang_fa_bao_b_toc;

    /**
     * Decodes a skill_wait_for_guang_fa_bao_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_guang_fa_bao_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_guang_fa_bao_b_toc;

    /**
     * Verifies a skill_wait_for_guang_fa_bao_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_guang_fa_bao_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_guang_fa_bao_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_guang_fa_bao_b_toc;

    /**
     * Creates a plain object from a skill_wait_for_guang_fa_bao_b_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_guang_fa_bao_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_guang_fa_bao_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_guang_fa_bao_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_guang_fa_bao_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_guang_fa_bao_b_tos. */
export class skill_guang_fa_bao_b_tos implements Iskill_guang_fa_bao_b_tos {

    /**
     * Constructs a new skill_guang_fa_bao_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_guang_fa_bao_b_tos);

    /** skill_guang_fa_bao_b_tos enable. */
    public enable: boolean;

    /** skill_guang_fa_bao_b_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_guang_fa_bao_b_tos cardIds. */
    public cardIds: number[];

    /** skill_guang_fa_bao_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_guang_fa_bao_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_guang_fa_bao_b_tos instance
     */
    public static create(properties?: Iskill_guang_fa_bao_b_tos): skill_guang_fa_bao_b_tos;

    /**
     * Encodes the specified skill_guang_fa_bao_b_tos message. Does not implicitly {@link skill_guang_fa_bao_b_tos.verify|verify} messages.
     * @param message skill_guang_fa_bao_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_guang_fa_bao_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_guang_fa_bao_b_tos message, length delimited. Does not implicitly {@link skill_guang_fa_bao_b_tos.verify|verify} messages.
     * @param message skill_guang_fa_bao_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_guang_fa_bao_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_guang_fa_bao_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_guang_fa_bao_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_guang_fa_bao_b_tos;

    /**
     * Decodes a skill_guang_fa_bao_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_guang_fa_bao_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_guang_fa_bao_b_tos;

    /**
     * Verifies a skill_guang_fa_bao_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_guang_fa_bao_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_guang_fa_bao_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_guang_fa_bao_b_tos;

    /**
     * Creates a plain object from a skill_guang_fa_bao_b_tos message. Also converts values to other types if specified.
     * @param message skill_guang_fa_bao_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_guang_fa_bao_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_guang_fa_bao_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_guang_fa_bao_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_guang_fa_bao_b_toc. */
export class skill_guang_fa_bao_b_toc implements Iskill_guang_fa_bao_b_toc {

    /**
     * Constructs a new skill_guang_fa_bao_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_guang_fa_bao_b_toc);

    /** skill_guang_fa_bao_b_toc playerId. */
    public playerId: number;

    /** skill_guang_fa_bao_b_toc enable. */
    public enable: boolean;

    /** skill_guang_fa_bao_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_guang_fa_bao_b_toc cards. */
    public cards: Icard[];

    /**
     * Creates a new skill_guang_fa_bao_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_guang_fa_bao_b_toc instance
     */
    public static create(properties?: Iskill_guang_fa_bao_b_toc): skill_guang_fa_bao_b_toc;

    /**
     * Encodes the specified skill_guang_fa_bao_b_toc message. Does not implicitly {@link skill_guang_fa_bao_b_toc.verify|verify} messages.
     * @param message skill_guang_fa_bao_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_guang_fa_bao_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_guang_fa_bao_b_toc message, length delimited. Does not implicitly {@link skill_guang_fa_bao_b_toc.verify|verify} messages.
     * @param message skill_guang_fa_bao_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_guang_fa_bao_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_guang_fa_bao_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_guang_fa_bao_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_guang_fa_bao_b_toc;

    /**
     * Decodes a skill_guang_fa_bao_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_guang_fa_bao_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_guang_fa_bao_b_toc;

    /**
     * Verifies a skill_guang_fa_bao_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_guang_fa_bao_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_guang_fa_bao_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_guang_fa_bao_b_toc;

    /**
     * Creates a plain object from a skill_guang_fa_bao_b_toc message. Also converts values to other types if specified.
     * @param message skill_guang_fa_bao_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_guang_fa_bao_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_guang_fa_bao_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_guang_fa_bao_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_qiang_ling_toc. */
export class skill_wait_for_qiang_ling_toc implements Iskill_wait_for_qiang_ling_toc {

    /**
     * Constructs a new skill_wait_for_qiang_ling_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_qiang_ling_toc);

    /** skill_wait_for_qiang_ling_toc playerId. */
    public playerId: number;

    /** skill_wait_for_qiang_ling_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_qiang_ling_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_qiang_ling_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_qiang_ling_toc instance
     */
    public static create(properties?: Iskill_wait_for_qiang_ling_toc): skill_wait_for_qiang_ling_toc;

    /**
     * Encodes the specified skill_wait_for_qiang_ling_toc message. Does not implicitly {@link skill_wait_for_qiang_ling_toc.verify|verify} messages.
     * @param message skill_wait_for_qiang_ling_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_qiang_ling_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_qiang_ling_toc message, length delimited. Does not implicitly {@link skill_wait_for_qiang_ling_toc.verify|verify} messages.
     * @param message skill_wait_for_qiang_ling_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_qiang_ling_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_qiang_ling_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_qiang_ling_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_qiang_ling_toc;

    /**
     * Decodes a skill_wait_for_qiang_ling_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_qiang_ling_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_qiang_ling_toc;

    /**
     * Verifies a skill_wait_for_qiang_ling_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_qiang_ling_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_qiang_ling_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_qiang_ling_toc;

    /**
     * Creates a plain object from a skill_wait_for_qiang_ling_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_qiang_ling_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_qiang_ling_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_qiang_ling_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_qiang_ling_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_qiang_ling_tos. */
export class skill_qiang_ling_tos implements Iskill_qiang_ling_tos {

    /**
     * Constructs a new skill_qiang_ling_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_qiang_ling_tos);

    /** skill_qiang_ling_tos enable. */
    public enable: boolean;

    /** skill_qiang_ling_tos types. */
    public types: card_type[];

    /** skill_qiang_ling_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_qiang_ling_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_qiang_ling_tos instance
     */
    public static create(properties?: Iskill_qiang_ling_tos): skill_qiang_ling_tos;

    /**
     * Encodes the specified skill_qiang_ling_tos message. Does not implicitly {@link skill_qiang_ling_tos.verify|verify} messages.
     * @param message skill_qiang_ling_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_qiang_ling_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_qiang_ling_tos message, length delimited. Does not implicitly {@link skill_qiang_ling_tos.verify|verify} messages.
     * @param message skill_qiang_ling_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_qiang_ling_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_qiang_ling_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_qiang_ling_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_qiang_ling_tos;

    /**
     * Decodes a skill_qiang_ling_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_qiang_ling_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_qiang_ling_tos;

    /**
     * Verifies a skill_qiang_ling_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_qiang_ling_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_qiang_ling_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_qiang_ling_tos;

    /**
     * Creates a plain object from a skill_qiang_ling_tos message. Also converts values to other types if specified.
     * @param message skill_qiang_ling_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_qiang_ling_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_qiang_ling_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_qiang_ling_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_qiang_ling_toc. */
export class skill_qiang_ling_toc implements Iskill_qiang_ling_toc {

    /**
     * Constructs a new skill_qiang_ling_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_qiang_ling_toc);

    /** skill_qiang_ling_toc playerId. */
    public playerId: number;

    /** skill_qiang_ling_toc types. */
    public types: card_type[];

    /**
     * Creates a new skill_qiang_ling_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_qiang_ling_toc instance
     */
    public static create(properties?: Iskill_qiang_ling_toc): skill_qiang_ling_toc;

    /**
     * Encodes the specified skill_qiang_ling_toc message. Does not implicitly {@link skill_qiang_ling_toc.verify|verify} messages.
     * @param message skill_qiang_ling_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_qiang_ling_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_qiang_ling_toc message, length delimited. Does not implicitly {@link skill_qiang_ling_toc.verify|verify} messages.
     * @param message skill_qiang_ling_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_qiang_ling_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_qiang_ling_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_qiang_ling_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_qiang_ling_toc;

    /**
     * Decodes a skill_qiang_ling_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_qiang_ling_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_qiang_ling_toc;

    /**
     * Verifies a skill_qiang_ling_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_qiang_ling_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_qiang_ling_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_qiang_ling_toc;

    /**
     * Creates a plain object from a skill_qiang_ling_toc message. Also converts values to other types if specified.
     * @param message skill_qiang_ling_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_qiang_ling_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_qiang_ling_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_qiang_ling_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jian_ren_a_tos. */
export class skill_jian_ren_a_tos implements Iskill_jian_ren_a_tos {

    /**
     * Constructs a new skill_jian_ren_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jian_ren_a_tos);

    /** skill_jian_ren_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jian_ren_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jian_ren_a_tos instance
     */
    public static create(properties?: Iskill_jian_ren_a_tos): skill_jian_ren_a_tos;

    /**
     * Encodes the specified skill_jian_ren_a_tos message. Does not implicitly {@link skill_jian_ren_a_tos.verify|verify} messages.
     * @param message skill_jian_ren_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jian_ren_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jian_ren_a_tos message, length delimited. Does not implicitly {@link skill_jian_ren_a_tos.verify|verify} messages.
     * @param message skill_jian_ren_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jian_ren_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jian_ren_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jian_ren_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jian_ren_a_tos;

    /**
     * Decodes a skill_jian_ren_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jian_ren_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jian_ren_a_tos;

    /**
     * Verifies a skill_jian_ren_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jian_ren_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jian_ren_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jian_ren_a_tos;

    /**
     * Creates a plain object from a skill_jian_ren_a_tos message. Also converts values to other types if specified.
     * @param message skill_jian_ren_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jian_ren_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jian_ren_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jian_ren_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jian_ren_a_toc. */
export class skill_jian_ren_a_toc implements Iskill_jian_ren_a_toc {

    /**
     * Constructs a new skill_jian_ren_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jian_ren_a_toc);

    /** skill_jian_ren_a_toc playerId. */
    public playerId: number;

    /** skill_jian_ren_a_toc card. */
    public card?: (Icard|null);

    /** skill_jian_ren_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_jian_ren_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_jian_ren_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jian_ren_a_toc instance
     */
    public static create(properties?: Iskill_jian_ren_a_toc): skill_jian_ren_a_toc;

    /**
     * Encodes the specified skill_jian_ren_a_toc message. Does not implicitly {@link skill_jian_ren_a_toc.verify|verify} messages.
     * @param message skill_jian_ren_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jian_ren_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jian_ren_a_toc message, length delimited. Does not implicitly {@link skill_jian_ren_a_toc.verify|verify} messages.
     * @param message skill_jian_ren_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jian_ren_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jian_ren_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jian_ren_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jian_ren_a_toc;

    /**
     * Decodes a skill_jian_ren_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jian_ren_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jian_ren_a_toc;

    /**
     * Verifies a skill_jian_ren_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jian_ren_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jian_ren_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jian_ren_a_toc;

    /**
     * Creates a plain object from a skill_jian_ren_a_toc message. Also converts values to other types if specified.
     * @param message skill_jian_ren_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jian_ren_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jian_ren_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jian_ren_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jian_ren_b_tos. */
export class skill_jian_ren_b_tos implements Iskill_jian_ren_b_tos {

    /**
     * Constructs a new skill_jian_ren_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jian_ren_b_tos);

    /** skill_jian_ren_b_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jian_ren_b_tos cardId. */
    public cardId: number;

    /** skill_jian_ren_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_jian_ren_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jian_ren_b_tos instance
     */
    public static create(properties?: Iskill_jian_ren_b_tos): skill_jian_ren_b_tos;

    /**
     * Encodes the specified skill_jian_ren_b_tos message. Does not implicitly {@link skill_jian_ren_b_tos.verify|verify} messages.
     * @param message skill_jian_ren_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jian_ren_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jian_ren_b_tos message, length delimited. Does not implicitly {@link skill_jian_ren_b_tos.verify|verify} messages.
     * @param message skill_jian_ren_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jian_ren_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jian_ren_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jian_ren_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jian_ren_b_tos;

    /**
     * Decodes a skill_jian_ren_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jian_ren_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jian_ren_b_tos;

    /**
     * Verifies a skill_jian_ren_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jian_ren_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jian_ren_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_jian_ren_b_tos;

    /**
     * Creates a plain object from a skill_jian_ren_b_tos message. Also converts values to other types if specified.
     * @param message skill_jian_ren_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jian_ren_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jian_ren_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jian_ren_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_jian_ren_b_toc. */
export class skill_jian_ren_b_toc implements Iskill_jian_ren_b_toc {

    /**
     * Constructs a new skill_jian_ren_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_jian_ren_b_toc);

    /** skill_jian_ren_b_toc playerId. */
    public playerId: number;

    /** skill_jian_ren_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_jian_ren_b_toc cardId. */
    public cardId: number;

    /**
     * Creates a new skill_jian_ren_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_jian_ren_b_toc instance
     */
    public static create(properties?: Iskill_jian_ren_b_toc): skill_jian_ren_b_toc;

    /**
     * Encodes the specified skill_jian_ren_b_toc message. Does not implicitly {@link skill_jian_ren_b_toc.verify|verify} messages.
     * @param message skill_jian_ren_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_jian_ren_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_jian_ren_b_toc message, length delimited. Does not implicitly {@link skill_jian_ren_b_toc.verify|verify} messages.
     * @param message skill_jian_ren_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_jian_ren_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_jian_ren_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_jian_ren_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_jian_ren_b_toc;

    /**
     * Decodes a skill_jian_ren_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_jian_ren_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_jian_ren_b_toc;

    /**
     * Verifies a skill_jian_ren_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_jian_ren_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_jian_ren_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_jian_ren_b_toc;

    /**
     * Creates a plain object from a skill_jian_ren_b_toc message. Also converts values to other types if specified.
     * @param message skill_jian_ren_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_jian_ren_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_jian_ren_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_jian_ren_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_sou_ji_a_tos. */
export class skill_sou_ji_a_tos implements Iskill_sou_ji_a_tos {

    /**
     * Constructs a new skill_sou_ji_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_sou_ji_a_tos);

    /** skill_sou_ji_a_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_sou_ji_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_sou_ji_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_sou_ji_a_tos instance
     */
    public static create(properties?: Iskill_sou_ji_a_tos): skill_sou_ji_a_tos;

    /**
     * Encodes the specified skill_sou_ji_a_tos message. Does not implicitly {@link skill_sou_ji_a_tos.verify|verify} messages.
     * @param message skill_sou_ji_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_sou_ji_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_sou_ji_a_tos message, length delimited. Does not implicitly {@link skill_sou_ji_a_tos.verify|verify} messages.
     * @param message skill_sou_ji_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_sou_ji_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_sou_ji_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_sou_ji_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_sou_ji_a_tos;

    /**
     * Decodes a skill_sou_ji_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_sou_ji_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_sou_ji_a_tos;

    /**
     * Verifies a skill_sou_ji_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_sou_ji_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_sou_ji_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_sou_ji_a_tos;

    /**
     * Creates a plain object from a skill_sou_ji_a_tos message. Also converts values to other types if specified.
     * @param message skill_sou_ji_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_sou_ji_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_sou_ji_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_sou_ji_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_sou_ji_a_toc. */
export class skill_sou_ji_a_toc implements Iskill_sou_ji_a_toc {

    /**
     * Constructs a new skill_sou_ji_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_sou_ji_a_toc);

    /** skill_sou_ji_a_toc playerId. */
    public playerId: number;

    /** skill_sou_ji_a_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_sou_ji_a_toc cards. */
    public cards: Icard[];

    /** skill_sou_ji_a_toc messageCard. */
    public messageCard?: (Icard|null);

    /** skill_sou_ji_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_sou_ji_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_sou_ji_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_sou_ji_a_toc instance
     */
    public static create(properties?: Iskill_sou_ji_a_toc): skill_sou_ji_a_toc;

    /**
     * Encodes the specified skill_sou_ji_a_toc message. Does not implicitly {@link skill_sou_ji_a_toc.verify|verify} messages.
     * @param message skill_sou_ji_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_sou_ji_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_sou_ji_a_toc message, length delimited. Does not implicitly {@link skill_sou_ji_a_toc.verify|verify} messages.
     * @param message skill_sou_ji_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_sou_ji_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_sou_ji_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_sou_ji_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_sou_ji_a_toc;

    /**
     * Decodes a skill_sou_ji_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_sou_ji_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_sou_ji_a_toc;

    /**
     * Verifies a skill_sou_ji_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_sou_ji_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_sou_ji_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_sou_ji_a_toc;

    /**
     * Creates a plain object from a skill_sou_ji_a_toc message. Also converts values to other types if specified.
     * @param message skill_sou_ji_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_sou_ji_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_sou_ji_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_sou_ji_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_sou_ji_b_tos. */
export class skill_sou_ji_b_tos implements Iskill_sou_ji_b_tos {

    /**
     * Constructs a new skill_sou_ji_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_sou_ji_b_tos);

    /** skill_sou_ji_b_tos cardIds. */
    public cardIds: number[];

    /** skill_sou_ji_b_tos messageCard. */
    public messageCard: boolean;

    /** skill_sou_ji_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_sou_ji_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_sou_ji_b_tos instance
     */
    public static create(properties?: Iskill_sou_ji_b_tos): skill_sou_ji_b_tos;

    /**
     * Encodes the specified skill_sou_ji_b_tos message. Does not implicitly {@link skill_sou_ji_b_tos.verify|verify} messages.
     * @param message skill_sou_ji_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_sou_ji_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_sou_ji_b_tos message, length delimited. Does not implicitly {@link skill_sou_ji_b_tos.verify|verify} messages.
     * @param message skill_sou_ji_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_sou_ji_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_sou_ji_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_sou_ji_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_sou_ji_b_tos;

    /**
     * Decodes a skill_sou_ji_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_sou_ji_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_sou_ji_b_tos;

    /**
     * Verifies a skill_sou_ji_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_sou_ji_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_sou_ji_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_sou_ji_b_tos;

    /**
     * Creates a plain object from a skill_sou_ji_b_tos message. Also converts values to other types if specified.
     * @param message skill_sou_ji_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_sou_ji_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_sou_ji_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_sou_ji_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_sou_ji_b_toc. */
export class skill_sou_ji_b_toc implements Iskill_sou_ji_b_toc {

    /**
     * Constructs a new skill_sou_ji_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_sou_ji_b_toc);

    /** skill_sou_ji_b_toc playerId. */
    public playerId: number;

    /** skill_sou_ji_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_sou_ji_b_toc cards. */
    public cards: Icard[];

    /** skill_sou_ji_b_toc messageCard. */
    public messageCard?: (Icard|null);

    /**
     * Creates a new skill_sou_ji_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_sou_ji_b_toc instance
     */
    public static create(properties?: Iskill_sou_ji_b_toc): skill_sou_ji_b_toc;

    /**
     * Encodes the specified skill_sou_ji_b_toc message. Does not implicitly {@link skill_sou_ji_b_toc.verify|verify} messages.
     * @param message skill_sou_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_sou_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_sou_ji_b_toc message, length delimited. Does not implicitly {@link skill_sou_ji_b_toc.verify|verify} messages.
     * @param message skill_sou_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_sou_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_sou_ji_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_sou_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_sou_ji_b_toc;

    /**
     * Decodes a skill_sou_ji_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_sou_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_sou_ji_b_toc;

    /**
     * Verifies a skill_sou_ji_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_sou_ji_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_sou_ji_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_sou_ji_b_toc;

    /**
     * Creates a plain object from a skill_sou_ji_b_toc message. Also converts values to other types if specified.
     * @param message skill_sou_ji_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_sou_ji_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_sou_ji_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_sou_ji_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_dui_zheng_xia_yao_a_tos. */
export class skill_dui_zheng_xia_yao_a_tos implements Iskill_dui_zheng_xia_yao_a_tos {

    /**
     * Constructs a new skill_dui_zheng_xia_yao_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_dui_zheng_xia_yao_a_tos);

    /** skill_dui_zheng_xia_yao_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_dui_zheng_xia_yao_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_dui_zheng_xia_yao_a_tos instance
     */
    public static create(properties?: Iskill_dui_zheng_xia_yao_a_tos): skill_dui_zheng_xia_yao_a_tos;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_a_tos message. Does not implicitly {@link skill_dui_zheng_xia_yao_a_tos.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_dui_zheng_xia_yao_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_a_tos message, length delimited. Does not implicitly {@link skill_dui_zheng_xia_yao_a_tos.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_dui_zheng_xia_yao_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_dui_zheng_xia_yao_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_dui_zheng_xia_yao_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_dui_zheng_xia_yao_a_tos;

    /**
     * Decodes a skill_dui_zheng_xia_yao_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_dui_zheng_xia_yao_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_dui_zheng_xia_yao_a_tos;

    /**
     * Verifies a skill_dui_zheng_xia_yao_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_dui_zheng_xia_yao_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_dui_zheng_xia_yao_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_dui_zheng_xia_yao_a_tos;

    /**
     * Creates a plain object from a skill_dui_zheng_xia_yao_a_tos message. Also converts values to other types if specified.
     * @param message skill_dui_zheng_xia_yao_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_dui_zheng_xia_yao_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_dui_zheng_xia_yao_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_dui_zheng_xia_yao_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_dui_zheng_xia_yao_a_toc. */
export class skill_dui_zheng_xia_yao_a_toc implements Iskill_dui_zheng_xia_yao_a_toc {

    /**
     * Constructs a new skill_dui_zheng_xia_yao_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_dui_zheng_xia_yao_a_toc);

    /** skill_dui_zheng_xia_yao_a_toc playerId. */
    public playerId: number;

    /** skill_dui_zheng_xia_yao_a_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_dui_zheng_xia_yao_a_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_dui_zheng_xia_yao_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_dui_zheng_xia_yao_a_toc instance
     */
    public static create(properties?: Iskill_dui_zheng_xia_yao_a_toc): skill_dui_zheng_xia_yao_a_toc;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_a_toc message. Does not implicitly {@link skill_dui_zheng_xia_yao_a_toc.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_dui_zheng_xia_yao_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_a_toc message, length delimited. Does not implicitly {@link skill_dui_zheng_xia_yao_a_toc.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_dui_zheng_xia_yao_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_dui_zheng_xia_yao_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_dui_zheng_xia_yao_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_dui_zheng_xia_yao_a_toc;

    /**
     * Decodes a skill_dui_zheng_xia_yao_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_dui_zheng_xia_yao_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_dui_zheng_xia_yao_a_toc;

    /**
     * Verifies a skill_dui_zheng_xia_yao_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_dui_zheng_xia_yao_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_dui_zheng_xia_yao_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_dui_zheng_xia_yao_a_toc;

    /**
     * Creates a plain object from a skill_dui_zheng_xia_yao_a_toc message. Also converts values to other types if specified.
     * @param message skill_dui_zheng_xia_yao_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_dui_zheng_xia_yao_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_dui_zheng_xia_yao_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_dui_zheng_xia_yao_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_dui_zheng_xia_yao_b_tos. */
export class skill_dui_zheng_xia_yao_b_tos implements Iskill_dui_zheng_xia_yao_b_tos {

    /**
     * Constructs a new skill_dui_zheng_xia_yao_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_dui_zheng_xia_yao_b_tos);

    /** skill_dui_zheng_xia_yao_b_tos enable. */
    public enable: boolean;

    /** skill_dui_zheng_xia_yao_b_tos cardIds. */
    public cardIds: number[];

    /** skill_dui_zheng_xia_yao_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_dui_zheng_xia_yao_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_dui_zheng_xia_yao_b_tos instance
     */
    public static create(properties?: Iskill_dui_zheng_xia_yao_b_tos): skill_dui_zheng_xia_yao_b_tos;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_b_tos message. Does not implicitly {@link skill_dui_zheng_xia_yao_b_tos.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_dui_zheng_xia_yao_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_b_tos message, length delimited. Does not implicitly {@link skill_dui_zheng_xia_yao_b_tos.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_dui_zheng_xia_yao_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_dui_zheng_xia_yao_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_dui_zheng_xia_yao_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_dui_zheng_xia_yao_b_tos;

    /**
     * Decodes a skill_dui_zheng_xia_yao_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_dui_zheng_xia_yao_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_dui_zheng_xia_yao_b_tos;

    /**
     * Verifies a skill_dui_zheng_xia_yao_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_dui_zheng_xia_yao_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_dui_zheng_xia_yao_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_dui_zheng_xia_yao_b_tos;

    /**
     * Creates a plain object from a skill_dui_zheng_xia_yao_b_tos message. Also converts values to other types if specified.
     * @param message skill_dui_zheng_xia_yao_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_dui_zheng_xia_yao_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_dui_zheng_xia_yao_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_dui_zheng_xia_yao_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_dui_zheng_xia_yao_b_toc. */
export class skill_dui_zheng_xia_yao_b_toc implements Iskill_dui_zheng_xia_yao_b_toc {

    /**
     * Constructs a new skill_dui_zheng_xia_yao_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_dui_zheng_xia_yao_b_toc);

    /** skill_dui_zheng_xia_yao_b_toc playerId. */
    public playerId: number;

    /** skill_dui_zheng_xia_yao_b_toc enable. */
    public enable: boolean;

    /** skill_dui_zheng_xia_yao_b_toc cards. */
    public cards: Icard[];

    /** skill_dui_zheng_xia_yao_b_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_dui_zheng_xia_yao_b_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_dui_zheng_xia_yao_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_dui_zheng_xia_yao_b_toc instance
     */
    public static create(properties?: Iskill_dui_zheng_xia_yao_b_toc): skill_dui_zheng_xia_yao_b_toc;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_b_toc message. Does not implicitly {@link skill_dui_zheng_xia_yao_b_toc.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_dui_zheng_xia_yao_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_b_toc message, length delimited. Does not implicitly {@link skill_dui_zheng_xia_yao_b_toc.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_dui_zheng_xia_yao_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_dui_zheng_xia_yao_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_dui_zheng_xia_yao_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_dui_zheng_xia_yao_b_toc;

    /**
     * Decodes a skill_dui_zheng_xia_yao_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_dui_zheng_xia_yao_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_dui_zheng_xia_yao_b_toc;

    /**
     * Verifies a skill_dui_zheng_xia_yao_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_dui_zheng_xia_yao_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_dui_zheng_xia_yao_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_dui_zheng_xia_yao_b_toc;

    /**
     * Creates a plain object from a skill_dui_zheng_xia_yao_b_toc message. Also converts values to other types if specified.
     * @param message skill_dui_zheng_xia_yao_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_dui_zheng_xia_yao_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_dui_zheng_xia_yao_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_dui_zheng_xia_yao_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_dui_zheng_xia_yao_c_tos. */
export class skill_dui_zheng_xia_yao_c_tos implements Iskill_dui_zheng_xia_yao_c_tos {

    /**
     * Constructs a new skill_dui_zheng_xia_yao_c_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_dui_zheng_xia_yao_c_tos);

    /** skill_dui_zheng_xia_yao_c_tos targetPlayerId. */
    public targetPlayerId: number;

    /** skill_dui_zheng_xia_yao_c_tos messageCardId. */
    public messageCardId: number;

    /** skill_dui_zheng_xia_yao_c_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_dui_zheng_xia_yao_c_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_dui_zheng_xia_yao_c_tos instance
     */
    public static create(properties?: Iskill_dui_zheng_xia_yao_c_tos): skill_dui_zheng_xia_yao_c_tos;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_c_tos message. Does not implicitly {@link skill_dui_zheng_xia_yao_c_tos.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_c_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_dui_zheng_xia_yao_c_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_c_tos message, length delimited. Does not implicitly {@link skill_dui_zheng_xia_yao_c_tos.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_c_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_dui_zheng_xia_yao_c_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_dui_zheng_xia_yao_c_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_dui_zheng_xia_yao_c_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_dui_zheng_xia_yao_c_tos;

    /**
     * Decodes a skill_dui_zheng_xia_yao_c_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_dui_zheng_xia_yao_c_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_dui_zheng_xia_yao_c_tos;

    /**
     * Verifies a skill_dui_zheng_xia_yao_c_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_dui_zheng_xia_yao_c_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_dui_zheng_xia_yao_c_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_dui_zheng_xia_yao_c_tos;

    /**
     * Creates a plain object from a skill_dui_zheng_xia_yao_c_tos message. Also converts values to other types if specified.
     * @param message skill_dui_zheng_xia_yao_c_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_dui_zheng_xia_yao_c_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_dui_zheng_xia_yao_c_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_dui_zheng_xia_yao_c_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_dui_zheng_xia_yao_c_toc. */
export class skill_dui_zheng_xia_yao_c_toc implements Iskill_dui_zheng_xia_yao_c_toc {

    /**
     * Constructs a new skill_dui_zheng_xia_yao_c_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_dui_zheng_xia_yao_c_toc);

    /** skill_dui_zheng_xia_yao_c_toc playerId. */
    public playerId: number;

    /** skill_dui_zheng_xia_yao_c_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_dui_zheng_xia_yao_c_toc messageCardId. */
    public messageCardId: number;

    /**
     * Creates a new skill_dui_zheng_xia_yao_c_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_dui_zheng_xia_yao_c_toc instance
     */
    public static create(properties?: Iskill_dui_zheng_xia_yao_c_toc): skill_dui_zheng_xia_yao_c_toc;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_c_toc message. Does not implicitly {@link skill_dui_zheng_xia_yao_c_toc.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_c_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_dui_zheng_xia_yao_c_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_dui_zheng_xia_yao_c_toc message, length delimited. Does not implicitly {@link skill_dui_zheng_xia_yao_c_toc.verify|verify} messages.
     * @param message skill_dui_zheng_xia_yao_c_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_dui_zheng_xia_yao_c_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_dui_zheng_xia_yao_c_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_dui_zheng_xia_yao_c_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_dui_zheng_xia_yao_c_toc;

    /**
     * Decodes a skill_dui_zheng_xia_yao_c_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_dui_zheng_xia_yao_c_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_dui_zheng_xia_yao_c_toc;

    /**
     * Verifies a skill_dui_zheng_xia_yao_c_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_dui_zheng_xia_yao_c_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_dui_zheng_xia_yao_c_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_dui_zheng_xia_yao_c_toc;

    /**
     * Creates a plain object from a skill_dui_zheng_xia_yao_c_toc message. Also converts values to other types if specified.
     * @param message skill_dui_zheng_xia_yao_c_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_dui_zheng_xia_yao_c_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_dui_zheng_xia_yao_c_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_dui_zheng_xia_yao_c_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_du_ji_a_tos. */
export class skill_du_ji_a_tos implements Iskill_du_ji_a_tos {

    /**
     * Constructs a new skill_du_ji_a_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_du_ji_a_tos);

    /** skill_du_ji_a_tos targetPlayerIds. */
    public targetPlayerIds: number[];

    /** skill_du_ji_a_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_du_ji_a_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_du_ji_a_tos instance
     */
    public static create(properties?: Iskill_du_ji_a_tos): skill_du_ji_a_tos;

    /**
     * Encodes the specified skill_du_ji_a_tos message. Does not implicitly {@link skill_du_ji_a_tos.verify|verify} messages.
     * @param message skill_du_ji_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_du_ji_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_du_ji_a_tos message, length delimited. Does not implicitly {@link skill_du_ji_a_tos.verify|verify} messages.
     * @param message skill_du_ji_a_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_du_ji_a_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_du_ji_a_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_du_ji_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_du_ji_a_tos;

    /**
     * Decodes a skill_du_ji_a_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_du_ji_a_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_du_ji_a_tos;

    /**
     * Verifies a skill_du_ji_a_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_du_ji_a_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_du_ji_a_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_du_ji_a_tos;

    /**
     * Creates a plain object from a skill_du_ji_a_tos message. Also converts values to other types if specified.
     * @param message skill_du_ji_a_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_du_ji_a_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_du_ji_a_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_du_ji_a_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_du_ji_a_toc. */
export class skill_du_ji_a_toc implements Iskill_du_ji_a_toc {

    /**
     * Constructs a new skill_du_ji_a_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_du_ji_a_toc);

    /** skill_du_ji_a_toc playerId. */
    public playerId: number;

    /** skill_du_ji_a_toc targetPlayerIds. */
    public targetPlayerIds: number[];

    /** skill_du_ji_a_toc cards. */
    public cards: Icard[];

    /**
     * Creates a new skill_du_ji_a_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_du_ji_a_toc instance
     */
    public static create(properties?: Iskill_du_ji_a_toc): skill_du_ji_a_toc;

    /**
     * Encodes the specified skill_du_ji_a_toc message. Does not implicitly {@link skill_du_ji_a_toc.verify|verify} messages.
     * @param message skill_du_ji_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_du_ji_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_du_ji_a_toc message, length delimited. Does not implicitly {@link skill_du_ji_a_toc.verify|verify} messages.
     * @param message skill_du_ji_a_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_du_ji_a_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_du_ji_a_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_du_ji_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_du_ji_a_toc;

    /**
     * Decodes a skill_du_ji_a_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_du_ji_a_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_du_ji_a_toc;

    /**
     * Verifies a skill_du_ji_a_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_du_ji_a_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_du_ji_a_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_du_ji_a_toc;

    /**
     * Creates a plain object from a skill_du_ji_a_toc message. Also converts values to other types if specified.
     * @param message skill_du_ji_a_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_du_ji_a_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_du_ji_a_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_du_ji_a_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_wait_for_du_ji_b_toc. */
export class skill_wait_for_du_ji_b_toc implements Iskill_wait_for_du_ji_b_toc {

    /**
     * Constructs a new skill_wait_for_du_ji_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_wait_for_du_ji_b_toc);

    /** skill_wait_for_du_ji_b_toc playerId. */
    public playerId: number;

    /** skill_wait_for_du_ji_b_toc targetPlayerIds. */
    public targetPlayerIds: number[];

    /** skill_wait_for_du_ji_b_toc cardIds. */
    public cardIds: number[];

    /** skill_wait_for_du_ji_b_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_wait_for_du_ji_b_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_wait_for_du_ji_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_wait_for_du_ji_b_toc instance
     */
    public static create(properties?: Iskill_wait_for_du_ji_b_toc): skill_wait_for_du_ji_b_toc;

    /**
     * Encodes the specified skill_wait_for_du_ji_b_toc message. Does not implicitly {@link skill_wait_for_du_ji_b_toc.verify|verify} messages.
     * @param message skill_wait_for_du_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_wait_for_du_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_wait_for_du_ji_b_toc message, length delimited. Does not implicitly {@link skill_wait_for_du_ji_b_toc.verify|verify} messages.
     * @param message skill_wait_for_du_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_wait_for_du_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_wait_for_du_ji_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_wait_for_du_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_wait_for_du_ji_b_toc;

    /**
     * Decodes a skill_wait_for_du_ji_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_wait_for_du_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_wait_for_du_ji_b_toc;

    /**
     * Verifies a skill_wait_for_du_ji_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_wait_for_du_ji_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_wait_for_du_ji_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_wait_for_du_ji_b_toc;

    /**
     * Creates a plain object from a skill_wait_for_du_ji_b_toc message. Also converts values to other types if specified.
     * @param message skill_wait_for_du_ji_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_wait_for_du_ji_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_wait_for_du_ji_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_wait_for_du_ji_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_du_ji_b_tos. */
export class skill_du_ji_b_tos implements Iskill_du_ji_b_tos {

    /**
     * Constructs a new skill_du_ji_b_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_du_ji_b_tos);

    /** skill_du_ji_b_tos enable. */
    public enable: boolean;

    /** skill_du_ji_b_tos cardId. */
    public cardId: number;

    /** skill_du_ji_b_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_du_ji_b_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_du_ji_b_tos instance
     */
    public static create(properties?: Iskill_du_ji_b_tos): skill_du_ji_b_tos;

    /**
     * Encodes the specified skill_du_ji_b_tos message. Does not implicitly {@link skill_du_ji_b_tos.verify|verify} messages.
     * @param message skill_du_ji_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_du_ji_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_du_ji_b_tos message, length delimited. Does not implicitly {@link skill_du_ji_b_tos.verify|verify} messages.
     * @param message skill_du_ji_b_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_du_ji_b_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_du_ji_b_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_du_ji_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_du_ji_b_tos;

    /**
     * Decodes a skill_du_ji_b_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_du_ji_b_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_du_ji_b_tos;

    /**
     * Verifies a skill_du_ji_b_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_du_ji_b_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_du_ji_b_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_du_ji_b_tos;

    /**
     * Creates a plain object from a skill_du_ji_b_tos message. Also converts values to other types if specified.
     * @param message skill_du_ji_b_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_du_ji_b_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_du_ji_b_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_du_ji_b_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_du_ji_b_toc. */
export class skill_du_ji_b_toc implements Iskill_du_ji_b_toc {

    /**
     * Constructs a new skill_du_ji_b_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_du_ji_b_toc);

    /** skill_du_ji_b_toc playerId. */
    public playerId: number;

    /** skill_du_ji_b_toc enable. */
    public enable: boolean;

    /** skill_du_ji_b_toc waitingPlayerId. */
    public waitingPlayerId: number;

    /** skill_du_ji_b_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_du_ji_b_toc card. */
    public card?: (Icard|null);

    /** skill_du_ji_b_toc waitingSecond. */
    public waitingSecond: number;

    /** skill_du_ji_b_toc seq. */
    public seq: number;

    /**
     * Creates a new skill_du_ji_b_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_du_ji_b_toc instance
     */
    public static create(properties?: Iskill_du_ji_b_toc): skill_du_ji_b_toc;

    /**
     * Encodes the specified skill_du_ji_b_toc message. Does not implicitly {@link skill_du_ji_b_toc.verify|verify} messages.
     * @param message skill_du_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_du_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_du_ji_b_toc message, length delimited. Does not implicitly {@link skill_du_ji_b_toc.verify|verify} messages.
     * @param message skill_du_ji_b_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_du_ji_b_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_du_ji_b_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_du_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_du_ji_b_toc;

    /**
     * Decodes a skill_du_ji_b_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_du_ji_b_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_du_ji_b_toc;

    /**
     * Verifies a skill_du_ji_b_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_du_ji_b_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_du_ji_b_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_du_ji_b_toc;

    /**
     * Creates a plain object from a skill_du_ji_b_toc message. Also converts values to other types if specified.
     * @param message skill_du_ji_b_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_du_ji_b_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_du_ji_b_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_du_ji_b_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_du_ji_c_tos. */
export class skill_du_ji_c_tos implements Iskill_du_ji_c_tos {

    /**
     * Constructs a new skill_du_ji_c_tos.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_du_ji_c_tos);

    /** skill_du_ji_c_tos inFrontOfMe. */
    public inFrontOfMe: boolean;

    /** skill_du_ji_c_tos seq. */
    public seq: number;

    /**
     * Creates a new skill_du_ji_c_tos instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_du_ji_c_tos instance
     */
    public static create(properties?: Iskill_du_ji_c_tos): skill_du_ji_c_tos;

    /**
     * Encodes the specified skill_du_ji_c_tos message. Does not implicitly {@link skill_du_ji_c_tos.verify|verify} messages.
     * @param message skill_du_ji_c_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_du_ji_c_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_du_ji_c_tos message, length delimited. Does not implicitly {@link skill_du_ji_c_tos.verify|verify} messages.
     * @param message skill_du_ji_c_tos message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_du_ji_c_tos, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_du_ji_c_tos message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_du_ji_c_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_du_ji_c_tos;

    /**
     * Decodes a skill_du_ji_c_tos message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_du_ji_c_tos
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_du_ji_c_tos;

    /**
     * Verifies a skill_du_ji_c_tos message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_du_ji_c_tos message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_du_ji_c_tos
     */
    public static fromObject(object: { [k: string]: any }): skill_du_ji_c_tos;

    /**
     * Creates a plain object from a skill_du_ji_c_tos message. Also converts values to other types if specified.
     * @param message skill_du_ji_c_tos
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_du_ji_c_tos, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_du_ji_c_tos to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_du_ji_c_tos
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a skill_du_ji_c_toc. */
export class skill_du_ji_c_toc implements Iskill_du_ji_c_toc {

    /**
     * Constructs a new skill_du_ji_c_toc.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill_du_ji_c_toc);

    /** skill_du_ji_c_toc playerId. */
    public playerId: number;

    /** skill_du_ji_c_toc waitingPlayerId. */
    public waitingPlayerId: number;

    /** skill_du_ji_c_toc targetPlayerId. */
    public targetPlayerId: number;

    /** skill_du_ji_c_toc card. */
    public card?: (Icard|null);

    /**
     * Creates a new skill_du_ji_c_toc instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill_du_ji_c_toc instance
     */
    public static create(properties?: Iskill_du_ji_c_toc): skill_du_ji_c_toc;

    /**
     * Encodes the specified skill_du_ji_c_toc message. Does not implicitly {@link skill_du_ji_c_toc.verify|verify} messages.
     * @param message skill_du_ji_c_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill_du_ji_c_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill_du_ji_c_toc message, length delimited. Does not implicitly {@link skill_du_ji_c_toc.verify|verify} messages.
     * @param message skill_du_ji_c_toc message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill_du_ji_c_toc, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill_du_ji_c_toc message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill_du_ji_c_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill_du_ji_c_toc;

    /**
     * Decodes a skill_du_ji_c_toc message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill_du_ji_c_toc
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill_du_ji_c_toc;

    /**
     * Verifies a skill_du_ji_c_toc message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill_du_ji_c_toc message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill_du_ji_c_toc
     */
    public static fromObject(object: { [k: string]: any }): skill_du_ji_c_toc;

    /**
     * Creates a plain object from a skill_du_ji_c_toc message. Also converts values to other types if specified.
     * @param message skill_du_ji_c_toc
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill_du_ji_c_toc, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill_du_ji_c_toc to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill_du_ji_c_toc
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

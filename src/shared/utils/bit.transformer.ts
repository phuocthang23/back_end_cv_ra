import { ValueTransformer } from 'typeorm';

export default class BitTransformer implements ValueTransformer {
    to(value: number | null): Buffer | null {
        if (value === null) {
            return null;
        }
        const res = Buffer.alloc(1);
        res[0] = value ? 1 : 0;
        return res;
    }
    from(value: Buffer): boolean | null {
        if (value === null) {
            return null;
        }
        return value[0] === 1;
    }
}
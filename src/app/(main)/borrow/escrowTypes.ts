// escrowTypes.ts
interface Escrow {
    startDate: string;
    endDate: string;
    collateral: {
        assets: {
            type: string;
            content: {
                meta: {
                    amount: string;
                };
                node: {
                    publicKey: string;
                    value: string;
                    id?: string;
                    sequence?: number;
                };
            };
            action: {
                type: string;
                configuration?: {
                    paths: {
                        fn: string;
                        tag: string;
                        addresses: { value: string; type: string }[];
                        args: string[];
                    }[];
                };
            };
            addresses: {
                value: string;
                type: string;
                publicKey: string;
            }[];
        }[];
    };
}

export default Escrow;

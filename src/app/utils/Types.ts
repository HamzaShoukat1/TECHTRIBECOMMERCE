


export type IProduct = {
    _id: string;
    productName: string;
    productPrice: number;
    productImage: {
        url: string;
    };
    productDescription: string;

};

export type IProductResponse = {
    AllProducts: IProduct[];
    totalPost: number;
};


export type IPRODUCTDETAIL = {
    _id: string;
    productName: string;
    productPrice: number;
    productImage: {
        url: string;

    }
    productDescription: string;
    productReviews?: string[];
    productSizes: ("L" | "XL" | "XS")[];
    productColors?: ("blue" | "black" | "green")[]
    productQuantity: number;
    createdAt: string;
    updatedAt: string;
};
export type CartItem = {
    _id: string;
    productName: string;
    productPrice: number;
    productImage: {
        url: string;
    };

    productDescription: string;
    productReviews?: string[];
    productSizes: ("L" | "XL" | "XS")[];
    productColors?: ("blue" | "black" | "green")[];
    productQuantity: number;
    selectedSize: string | null;
    selectedColor: string | null;
    createdAt: string;
    updatedAt: string;
};

export type CartResponse = {
    _id: string;
    userId: string;
    items: CartItem[];
};


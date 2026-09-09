


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



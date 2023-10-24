interface Listing {
    heading: String;
    price: Number;
    shortDescription: String;
    //TODO: Calculate time left until booking expires?
    timeExpire: Date,
    //TODO: Get currency data
    currency: String,
}
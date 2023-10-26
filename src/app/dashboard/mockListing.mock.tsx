import { Listing } from "../types/user"

/**
 * Temp Data
 */

const mockedListings: Array<Listing> = [
    {
        name: "Grand Royal Hotel",
        address: "123 Royal Lane, Cityville",
        price: 150,
        checkInDate: "2023-11-05",
        checkoutDate: "2023-11-10",
        imageUrl: "https://example.com/images/hotel1.jpg"
    },
    {
        name: "Oceanview Resort",
        address: "456 Beach Drive, Seaside",
        price: 220,
        checkInDate: "2023-11-12",
        checkoutDate: "2023-11-18",
        imageUrl: "https://example.com/images/hotel2.jpg"
    },
    {
        name: "Downtown Suites",
        address: "789 Metro Street, Urbantown",
        price: 110,
        checkInDate: "2023-11-20",
        checkoutDate: "2023-11-22",
        imageUrl: "https://example.com/images/hotel3.jpg"
    },
    {
        name: "Mountain Escape Lodge",
        address: "101 Pine Road, Mountaintop",
        price: 180,
        checkInDate: "2023-11-25",
        checkoutDate: "2023-11-30",
        imageUrl: "https://example.com/images/hotel4.jpg"
    },
    {
        name: "Lakeside Inn",
        address: "202 Lake Drive, Countryside",
        price: 140,
        checkInDate: "2023-12-01",
        checkoutDate: "2023-12-05",
        imageUrl: "https://example.com/images/hotel5.jpg"
    }
]


export default mockedListings
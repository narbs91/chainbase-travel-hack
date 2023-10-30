

export const mockAwardWalletResponse = {
    "apiVersion": 2,
    "requestId": "4a70ad4d26a463b025a2785ca6c959d3",
    "status": "success",
    "statusMessage": null,
    "rejectMethod": null,
    "missingFields": null,
    "providerCode": "spg",
    "itineraries": [
        {
            "travelAgency": null,
            "pricingInfo": {
                "total": 300,
                "cost": 200,
                "discount": 40,
                "spentAwards": "10000 points",
                "currencyCode": "USD",
                "fees": [
                    {
                        "name": "Tax",
                        "charge": 100
                    }
                ]
            },
            "status": "Confirmed",
            "reservationDate": "2000-01-01T00:00:00",
            "providerInfo": {
                "code": "spg",
                "name": "Starwood Hotels",
                "accountNumbers": [
                    {
                        "number": "xxxxxx345",
                        "masked": true
                    }
                ],
                "earnedRewards": "4 nights"
            },
            "cancelled": null,
            "cancellationPolicy": "Cancel, no-show or early check out 100% charge non refundable",
            "notes": null,
            "confirmationNumbers": [
                {
                    "number": "1122334455",
                    "description": "Confirmation number",
                    "isPrimary": true
                },
                {
                    "number": "887756",
                    "description": "Reference",
                    "isPrimary": false
                }
            ],
            "hotelName": "Sheraton Philadelphia Downtown Hotel",
            "chainName": null,
            "address": {
                "text": "201 North 17th Street, Philadelphia, Pennsylvania 19103 United States",
                "addressLine": "201 North 17th Street",
                "city": "Philadelphia",
                "stateName": "Pennsylvania ",
                "countryName": "United States",
                "countryCode": "US",
                "postalCode": "19103",
                "lat": 39.957262,
                "lng": -75.166752,
                "timezone": -18000,
                "timezoneId": "America/New_York"
            },
            "checkInDate": "2030-01-01T13:30:00",
            "checkOutDate": "2030-01-05T12:00:00",
            "phone": "+1-22-3333",
            "fax": "+1-66-77899",
            "guests": [
                {
                    "name": "John D.",
                    "full": false,
                    "type": null
                },
                {
                    "name": "Jane D.",
                    "full": false,
                    "type": null
                }
            ],
            "guestCount": 2,
            "kidsCount": 3,
            "roomsCount": 1,
            "cancellationNumber": null,
            "cancellationDeadline": "2029-12-30T12:00:00",
            "isNonRefundable": true,
            "rooms": [
                {
                    "type": "King bed",
                    "description": "Traditional, TV, free wi-fi",
                    "rate": "30$/night",
                    "rateType": "King bed"
                }
            ],
            "freeNights": 1,
            "type": "hotelReservation"
        }
    ],
    "loyaltyAccount": null,
    "pricingInfo": null,
    "fromProvider": false,
    "metadata": {
        "from": {
            "name": null,
            "email": "hotel@test.awardwallet.com"
        },
        "to": [
            {
                "name": null,
                "email": "plans@awardwallet.com"
            }
        ],
        "cc": [],
        "subject": "Hotel reservation",
        "receivedDateTime": null,
        "userEmail": "hotel@test.awardwallet.com",
        "nested": false,
        "mailboxId": null,
        "mailboxAddress": null
    },
    "nestedEmailMetadata": null,
    "parsingMethod": "auto",
    "flightStatsMethodsUsed": [],
    "userData": null,
    "email": "RnJvbTogaG90ZWxAdGVzdC5hd2FyZHdhbGxldC5jb20KVG86IHBsYW5zQGF3YXJkd2FsbGV0LmNvbQpTdWJqZWN0OiBIb3RlbCByZXNlcnZhdGlvbg==",
    "cardPromo": null
} as any
import { NextResponse } from "next/server";
import { ImportBookingService } from "../impl/service/import/import.booking.service";

export const revalidate = 0;

const importService = new ImportBookingService();

export async function GET() {
    const bookings = await importService.getPropertiesFromUserEmail(
        "From: hotel@test.awardwallet.com\nTo: plans@awardwallet.com\nSubject: Hotel reservation\n\nNot used\ntext"
    );

    return NextResponse.json({ bookings })
}
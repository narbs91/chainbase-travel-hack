import { NextResponse } from "next/server";
import { PropertyService } from "../impl/service/supply/property/property.service";

const propertyService = new PropertyService();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    let resp = {}
    
    if (id) {
        resp = await propertyService.getPropertyListing(id);
    }

    return NextResponse.json({ resp })
}
import React from "react";

import { PropertyService } from "@/app/api/impl/service/supply/property/property.service";
import PropertyDetailDataLoadErrorComponent from "../../data-not-loaded";
import _ from "lodash";
import DetailCard from "../detail-card";

async function getData(id: string) {
  const propertyService = new PropertyService();
  const listing = await propertyService.getPropertyListing(id);

  return listing;
}

const HotelDetailsPage = async ({ params }: { params: { id: string } }) => {
  const property = await getData(params.id);

  if (_.isEmpty(property)) {
    return (
      <>
        <PropertyDetailDataLoadErrorComponent />
      </>
    );
  }

  return <DetailCard listing={property} />;
};

export default HotelDetailsPage;

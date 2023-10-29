import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  Divider,
  Flex,
  Avatar,
  Center,
} from "@chakra-ui/react";

function AboutPage() {
  return (
    <Box p={6} maxWidth="800px" margin="0 auto" color={"black"}>
      {/* Logo */}
      <VStack padding={5}>
        <Image
          title="rebookt-logo"
          src="/rebookt_logo.png"
          alt="ReBookT logo"
          width={200}
        />
      </VStack>

      {/* What the project is */}
      <VStack align="start" spacing={4}>
        <Heading size="lg">What is ReBookt?</Heading>
        <Text>
          ReBookt is a secondary marketplace for travel bookings, starting with Hotels. ReBookt members
          can buy or list hotel bookings for sale on our marketplace purchased
          through popular online travel agencies or directly through a hotel.
        </Text>
      </VStack>

      <Divider my={6} />

      {/* What problem does it solve */}
      <VStack align="start" spacing={4}>
        <Heading size="lg">What problem does it solve?</Heading>
        <Text>
          ReBookt is looking to bring a secondary retail market for popular
          and/or sold out properties, particularly in the case of non-cancelable
          stays . When a hotel booking is made, its often the case that the end
          traveler wants to purchase that stay for the lowest price possible.
          Typically the cheapest rates for stays are usually bookings that
          cannot be cancelled meaning if the traveler decides they no longer
          want to go on a trip, they lose out on getting refunded.
        </Text>

        <Text>
          Similarly, imagine you want to go to a popular destination during a
          peak holiday season and it just so happens that your favorite hotel is
          sold out. In todays reality, you likely wont be able to goto that trip
          at the hotel you want and will have to settle for a less then ideal
          accommodation
        </Text>

        <Text>
          ReBookt solves these problems by allowing members sell their
          non-cancelable (or cancelable) stays as well be able to buy sold out
          accommodations listed on our secondary marketplace.
        </Text>
      </VStack>

      <Divider my={6} />

      {/* How the project works */}
      <VStack align="start" spacing={4}>
        <Heading size="lg">How Does it Work?</Heading>
        <Text>
          Once a user signs up with their email address, they can import
          bookings that are attached to that address into their ReBookt account.
          Once imported, the user can list the hotel booking for a price of
          their choosing. Once the hotel listing has been sold, the lister
          receives the money for the purchase and we take care of the plumbing
          to ensure the booking is now under the purchasers name. We collect a
          processing fee and pass a portion of that back to the hotel in the
          form of a royalty.
        </Text>
      </VStack>

      <Divider my={6} />

      {/* Team Members */}
      <Heading size="lg" mb={4}>
        Meet the Team
      </Heading>
      <Flex direction={["column", "row"]} padding={6}>
        {/* Member 1 */}
        <Box flex="1" padding={3}>
          <Avatar
            src="./narb_avatar.png"
            borderRadius="full"
            mb={4}
            width={150}
            height={150}
          />
          <Heading size="md">Narb</Heading>
          <Text>
            Narb is a software engineer with over 7 years of experience. He is s
            a multi-time founder who loves building software that positively
            impacts the world!
          </Text>
        </Box>
        {/* Member 2 */}
        <Box flex="1" padding={3}>
          <Avatar
            src="./nav_avatar.jpeg"
            borderRadius="full"
            mb={4}
            width={150}
            height={150}
          />
          <Heading size="md">Nav</Heading>
          <Text>
            Member 2 is a software engineer with over X years of experience in
            ABC technologies. They played a pivotal role in DEF aspect of the
            project.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default AboutPage;

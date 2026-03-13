import Container from "@/src/components/Container";
import Dealsbanner from "@/src/components/hotdeals/Dealsbanner";
import HotdealsCollection from "@/src/components/hotdeals/HotdealsCollection";
import HotDealsStates from "@/src/components/hotdeals/HotDealsStates";
import { getHotDeals } from "@/src/sanity/queries/query";

const page = async () => {
  const hotdealsData = await getHotDeals();

  console.log(hotdealsData);

  return (
    <Container>
      <Dealsbanner hotdealsData={hotdealsData?.data} />
      <HotDealsStates />
      <HotdealsCollection />
    </Container>
  );
};

export default page;

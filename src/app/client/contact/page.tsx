import Container from "@/src/components/Container";
import Help from "@/src/components/contact/Help";
import Form from "@/src/components/contact/Form";
import FAQ from "@/src/components/contact/FAQ";

const page = () => {
  return (
    <>
      <Help />
      <Container>
        <Form />
        <FAQ />
      </Container>
    </>
  );
};

export default page;

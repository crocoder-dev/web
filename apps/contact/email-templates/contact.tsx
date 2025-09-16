import { Text, Section } from "@react-email/components";
import Layout from "./components/Layout";

const ContactTemplate = () => {
  return (
    <Layout>
      <Section>
        <Text>
          Hi, <br />
          Thank you for getting in touch!
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor.
          <br />
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor.
          <br />
          <br />
          Best regards, <br />
          The CroCoder team
        </Text>
      </Section>
    </Layout>
  );
};

export default ContactTemplate;

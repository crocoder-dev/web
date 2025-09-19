import { Hr, Section, Text } from "@react-email/components";
import Blog from "./components/Blog";
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
        <Hr />
        <Blog
          description="While waiting for an answer look at how we helped other teams"
          blogLinks={[
            {
              path: "migrating-an-enterprise-app-from-angularjs-to-react",
              imageUrl: "/images/from-angular-to-react.png",
              title: "Migrating an Enterprise App from AngularJS to React",
            },
            {
              path: "how-we-rebuilt-a-legacy-ui-with-zero-downtime",
              imageUrl:
                "/images/how-we-rebuilt-a-legacy-ui-with-zero-downtime.png",
              title:
                "How We Rebuilt a Legacy UI With Zero Downtime: A Case Study in Component Libraries and Frontend Guidance",
            },
            {
              path: "using-lago-to-create-a-flexible-billing-system",
              imageUrl:
                "/images/using-lago-to-create-a-flexible-billing-system-2.png",
              title: "Using Lago to Create a Flexible Billing System",
            },
          ]}
        />
      </Section>
    </Layout>
  );
};

export default ContactTemplate;

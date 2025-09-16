import {
  Html,
  Img,
  Body,
  Section,
  Column,
  Tailwind,
  pixelBasedPreset,
  Row,
  Link,
  Container,
  Hr,
  Text,
} from "@react-email/components";

const baseUrl = "https://crocoder.dev";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}
    >
      <Html lang="en" dir="ltr">
        <Body
          className="m-0 p-0 h-screen font-sans"
          style={{
            backgroundImage: `url('${baseUrl}/pattern_light.png')`,
            backgroundSize: "contain",
            backgroundBlendMode: "lighten",
          }}
        >
          <Container className="rounded-lg">
            <Row className="bg-[#3C3843] pt-3 pb-2">
              <Column
                align="left"
                className="table-cell align-bottom px-4 h-[51px]"
              >
                <Row className="table-cell">
                  <Column>
                    <Link href={baseUrl}>
                      <Img
                        src={`${baseUrl}/_vercel/image?url=_astro%2Fcrocoder-logo.C0zJTFWP.png&w=320&q=100`}
                        alt="Crocoder logo"
                        width={64}
                        className="inline"
                      />
                    </Link>
                  </Column>
                  <Column className="pl-3">
                    <Link href={baseUrl}>
                      <Img
                        src={`${baseUrl}/images/crocoder-text.svg`}
                        alt="Crocoder logo"
                        width={155}
                        className="inline"
                      />
                    </Link>
                  </Column>
                </Row>
              </Column>
            </Row>
            <Container className="py-8 px-4 bg-neutral-50">
              {children}
            </Container>
            <Section className="bg-[#3C3843] px-4">
              <Row>
                <Row className="pt-3 pb-2">
                  <Column
                    align="left"
                    className="table-cell align-bottom h-[51px]"
                  >
                    <Row className="table-cell">
                      <Column>
                        <Link href={baseUrl}>
                          <Img
                            src={`${baseUrl}/_vercel/image?url=_astro%2Fcrocoder-logo.C0zJTFWP.png&w=320&q=100`}
                            alt="Crocoder logo"
                            width={64}
                            className="inline"
                          />
                        </Link>
                      </Column>
                      <Column className="pl-3">
                        <Link href={baseUrl}>
                          <Img
                            src={`${baseUrl}/images/crocoder-text.svg`}
                            alt="Crocoder logo"
                            width={155}
                            className="inline"
                          />
                        </Link>
                      </Column>
                    </Row>
                  </Column>
                </Row>
                <Row>
                  <Hr className="border-t my-4 !border-neutral-50" />
                </Row>
                <Row>
                  <Text className="text-neutral-50 text-xs mt-0">{`© ${new Date().getFullYear()} CroCoder, Inc. All rights reserved`}</Text>
                </Row>
                <Row>
                  <Text className="text-neutral-50 text-xs mt-0">
                    This email and its contents are provided for informational
                    and promotional purposes only. It represents the interests
                    of both CroCoder, Inc. and Abram d.o.o. The information
                    shared is intended to highlight the products, services, and
                    initiatives of these companies.
                  </Text>
                </Row>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
export default Layout;

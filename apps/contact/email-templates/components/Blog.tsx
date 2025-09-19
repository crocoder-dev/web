import { Column, Img, Link, Row, Section, Text } from "@react-email/components";

const baseUrl = "https://www.crocoder.dev";

const Blog = ({
  blogLinks = [],
  description,
}: {
  blogLinks: Array<{ path: string; title: string; imageUrl: string }>;
  description: string;
}) => {
  return (
    <Section className="pt-2">
      <Row>
        <Column>
          <Text>{description}</Text>
        </Column>
      </Row>
      <Row className="table-fixed">
        {blogLinks.map(({ path, title, imageUrl }) => {
          return (
            <Column className="pr-4 align-top">
              <Link href={`${baseUrl}/blog/${path}`} className=" h-full">
                <Img
                  src={`${baseUrl}/${imageUrl}`}
                  width={"100%"}
                  height={120}
                  className="rounded-md object-cover aspect-video"
                />
                <Text className="text-neutral-700 font-bold">{title}</Text>
              </Link>
            </Column>
          );
        })}
      </Row>
    </Section>
  );
};
export default Blog;

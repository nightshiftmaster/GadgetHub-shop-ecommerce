import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { MyFormValues } from "@/types/types";
import { InitialState } from "@/redux/features/productsSlice";
import { BASE_API_URL } from "@/utils/constants";

export const AppleReceiptEmail = ({
  delivery,
  order,
}: {
  delivery: MyFormValues;
  order: InitialState;
}) => {
  return (
    <Html>
      <Head />
      <Preview>GadgetHub Receipt</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <div className="flex justify-center">
              <Column>
                <Text style={heading}>GadgetHub Receipt</Text>
              </Column>
            </div>
          </Section>
          <Section>
            <Text style={cupomText}>
              Save 3% on all your purchases.
              <sup style={supStyle}>1</sup>{" "}
              <Link href={BASE_API_URL}>Apply and use in minutes</Link>
              <sup style={supStyle}>2</sup>
            </Text>
          </Section>

          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={3}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>NAME</Text>
                      <Text style={informationTableValue}>
                        {delivery.firstName}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>COUNTRY</Text>
                      <Text style={informationTableValue}>
                        {delivery.country}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>CITY</Text>
                      <Text style={informationTableValue}>{delivery.city}</Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
              <Column colSpan={3}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>LAST NAME</Text>
                      <Text style={informationTableValue}>
                        {delivery.lastName}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>ADDRESS</Text>
                      <Text style={informationTableValue}>
                        {delivery.address}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>MOBILE</Text>
                      <Text style={informationTableValue}>
                        {delivery.mobileNumber}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
              <Column colSpan={3}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>EMAIL</Text>
                      <Text style={informationTableValue}>
                        {delivery.email}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>ADDITIONAL INFO</Text>
                      <Text style={informationTableValue}>
                        {delivery.additionalInfo}
                      </Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}></Text>
                      <Text style={informationTableValue}></Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
            </Row>
          </Section>

          <Section style={productTitleTable}>
            <Text style={productsTitle}>Purchased Items</Text>
          </Section>
          {order.cart.map((item) => {
            return (
              <Section key={item._id}>
                <Column style={{ width: "64px" }}>
                  <Img
                    src={item.thumbnail}
                    width="55"
                    height="55"
                    alt="item image"
                    style={productIcon}
                  />
                </Column>
                <Column style={{ paddingLeft: "22px" }}>
                  <Text style={productTitle}>{item.title}</Text>
                  {/* <Text style={productDescription}>{item.description}</Text> */}
                  {/* <Text style={productDescription}>Renews Aug 20, 2023</Text> */}
                </Column>

                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>${item.price}</Text>
                </Column>
              </Section>
            );
          })}

          <Hr style={productPriceLine} />
          <Section align="right">
            <Column style={tableCell} align="right">
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>${order.total}</Text>
            </Column>
          </Section>
          <Hr style={productPriceLineBottom} />

          <Section>
            <Column align="center" style={ctaTitle}>
              <Text style={ctaText}>
                Save 3% on all your GadgetHub purchases.
              </Text>
            </Column>
          </Section>

          <Text style={footerCopyright}>
            Copyright © 2024 Gadget Hub. <br />{" "}
            <Link href={BASE_API_URL}>All rights reserved</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default AppleReceiptEmail;

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  marginTop: "30px",
  padding: "20px 0 48px",
  width: "700px",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const cupomText = {
  textAlign: "center" as const,
  margin: "36px 0 40px 0",
  fontSize: "14px",
  fontWeight: "500",
  color: "#111111",
};

const supStyle = {
  fontWeight: "300",
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
  width: "70%",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: "30px 0 15px 0",
  height: "24px",
};

const productsTitle = {
  background: "#fafafa",
  paddingLeft: "10px",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0",
};

const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "50px",
  border: "1px solid rgba(128,128,128,0.2)",
};

const productTitle = {
  fontSize: "10px",
  fontWeight: "600",
  width: "120px",
  overflow: "scroll",
  whiteSpace: "nowrap",
  ...resetText,
};

const productPriceTotal = {
  margin: "0",
  color: "rgb(102,102,102)",
  fontSize: "10px",
  fontWeight: "600",
  padding: "0px 30px 0px 0px",
  textAlign: "right" as const,
};

const productPrice = {
  fontSize: "12px",
  fontWeight: "600",
  justifyContent: "start",
  // margin: "0",
};

const productPriceLarge = {
  margin: "0px 20px 0px 0px",
  fontSize: "16px",
  fontWeight: "600",
  whiteSpace: "nowrap" as const,
  textAlign: "right" as const,
};

const productPriceWrapper = {
  display: "table-cell",
  padding: "0px 20px 0px 0px",
  width: "100px",
  justifyContent: "start",
  // verticalAlign: "top",
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceVerticalLine = {
  height: "48px",
  borderLeft: "1px solid",
  borderColor: "rgb(238,238,238)",
};

const productPriceLargeWrapper = { display: "table-cell", width: "90px" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const ctaTitle = {
  display: "block",
  margin: "15px 0 0 0",
};

const ctaText = { fontSize: "24px", fontWeight: "500" };

const footerCopyright = {
  margin: "25px 0 0 0",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "rgb(102,102,102)",
};

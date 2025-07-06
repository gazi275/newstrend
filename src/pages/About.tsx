import React from "react";
import { Layout,  Row, Col, Typography, Button, Card } from "antd";

const {  Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const About = () => {
  return (
    <Layout style={layoutStyle}>
      

      <Content style={contentStyle}>
        <div style={bannerStyle}>
          <Title level={1} style={bannerTitleStyle}>
            About Newslens BD
          </Title>
          <Paragraph style={bannerTextStyle}>
            Discover the story behind the platform that transforms news into insights.
          </Paragraph>
        </div>

        <div style={contentWrapperStyle}>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={12}>
              <Card style={sectionCardStyle} bordered={false}>
                <Title level={3}>Our Mission</Title>
                <Paragraph>
                  At Newslens BD, our mission is to empower readers with deep insights into news content through advanced sentiment and moral framing analysis. Launched in 2025, we aim to bridge the gap between raw news and informed decision-making.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={sectionCardStyle} bordered={false}>
                <Title level={3}>Key Features</Title>
                <Paragraph>
                  <ul style={listStyle}>
                    <li><Text strong>Sentiment Analysis:</Text> Detects emotional tone using TextBlob.</li>
                    <li><Text strong>Moral Framing:</Text> Analyzes ethical perspectives (Care, Fairness, etc.).</li>
                    <li><Text strong>Interactive UI:</Text> Engage with news via reactions and comments.</li>
                  </ul>
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={sectionCardStyle} bordered={false}>
                <Title level={3}>Development Journey</Title>
                <Paragraph>
                  <ul style={listStyle}>
                    <li><Text strong>Started:</Text> January 2025</li>
                    <li><Text strong>Completed:</Text> June 2025</li>
                    <li><Text strong>Tech Stack:</Text> React, Flask, MongoDB, Ant Design, Tailwind CSS</li>
                  </ul>
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={sectionCardStyle} bordered={false}>
                <Title level={3}>Get in Touch</Title>
                <Paragraph>
                  <ul style={listStyle}>
                    <li><Text strong>Email:</Text> support@newslensbd.com</li>
                    <li><Text strong>Website:</Text> www.newslensbd.com</li>
                  </ul>
                  <Button type="primary" size="large" style={contactButtonStyle}>
                    Contact Us
                  </Button>
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer style={footerStyle}>
        <Row justify="center">
          <Col>
            <Text style={footerTextStyle}>
              © 2025 Newslens BD. All rights reserved. | Designed with ❤️ in Bangladesh.
            </Text>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

// Inline styles
const layoutStyle: React.CSSProperties = {
  minHeight: "100vh",
};







const contentStyle: React.CSSProperties = {
  padding: "40px 20px",
  background: "#f0f4f8",
};

const bannerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "60px 20px",
  background: "linear-gradient(135deg, #1890ff, #40a9ff)",
  color: "#fff",
  borderRadius: "10px",
  marginBottom: "40px",
};

const bannerTitleStyle: React.CSSProperties = {
  fontSize: "3em",
  marginBottom: "10px",
};

const bannerTextStyle: React.CSSProperties = {
  fontSize: "1.2em",
  maxWidth: "600px",
  margin: "0 auto",
};

const contentWrapperStyle: React.CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const sectionCardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  height: "100%",
};

const listStyle: React.CSSProperties = {
  paddingLeft: "20px",
  marginBottom: "10px",
};

const contactButtonStyle: React.CSSProperties = {
  marginTop: "20px",
  background: "#1890ff",
  borderColor: "#1890ff",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "20px",
  background: "#fff",
  borderTop: "1px solid #e8e8e8",
};

const footerTextStyle: React.CSSProperties = {
  color: "#7f8c8d",
};

export default About;
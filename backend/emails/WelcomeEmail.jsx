// backend/emails/WelcomeEmail.jsx
import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
} from "@react-email/components";

export default function WelcomeEmail({ name }) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>Hey {name}, welcome to the platform 🚀</Text>
        </Container>
      </Body>
    </Html>
  );
}
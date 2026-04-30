import type { Meta, StoryObj } from "@storybook/react-vite";

import { AboutSection } from "../../../widgets/about";
import { ContactSection } from "../../../widgets/contact";
import { FooterSection } from "../../../widgets/footer";
import { FootprintsSection } from "../../../widgets/footprints";
import { HeroSection } from "../../../widgets/hero";
import { HomePageUI } from "./home-page.ui";

const meta = {
  component: HomePageUI,
  parameters: {
    layout: "fullscreen",
  },
  title: "Pages/HomePage",
} satisfies Meta<typeof HomePageUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slots: {
      HeroSection: <HeroSection />,
      AboutSection: <AboutSection />,
      FootprintsSection: <FootprintsSection />,
      ContactSection: <ContactSection />,
      FooterSection: <FooterSection />,
    },
  },
};

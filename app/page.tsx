import LandingInfo from "@/components/LandingInfo";
import Navbar from "@/components/Navbar";
import SaaSLandingImage from "../assets/image.png";
import Image from "next/image";
export default function Home() {
  console.log(localStorage.getItem("date"));
  return (
    <main className="overflow-x-hidden grid-background">
      <Navbar />
      <div className="flex min-h-[110vh] min-w-[100vw] items-center justify-center flex-col gap-5">
        <LandingInfo />
        <Image about="FDSQF" src={SaaSLandingImage} alt="alt" width={900} height={900} className="rounded-xl border-gray-300 border"/>
      </div>
    </main>
  );
}
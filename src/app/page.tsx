import Image from "next/image";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import ContainerRpp from "./component/rpp/ContainerRpp";
import Navbar from "./component/template/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ContainerRpp />
    </div>
  );
}

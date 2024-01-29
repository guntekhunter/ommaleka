import Image from "next/image";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import ContainerRpp from "./component/rpp/ContainerRpp";

export default function Home() {
  return (
    <div>
      <ContainerRpp />
    </div>
  );
}

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";

export default function Home() {
  return (
    <div className={"flex flex-col gap-4"}>
      <div>
        <Button variant={"elevated"}>
          I am a button
        </Button>
      </div>
      <div>
        <Input placeholder={"I am an input"}/>
      </div>
      <Progress value={50}/>
    </div>
  );
}

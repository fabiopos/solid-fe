import { H1 } from "@/components/ui/typograhpy";
import { PlayerGet } from "@/features/player/application/PlayerGet";
import { ApiClient } from "@/lib/ApiClient";
import React from "react";

async function PlayersPage() {
  const playerGet = new PlayerGet(new ApiClient());
  await playerGet.getAllPlayers();
  return (
    <div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. At eum odio
        corrupti, alias voluptatum, quasi et sit accusamus, eos consequuntur
        delectus? Illum temporibus atque animi tempore, nemo quae voluptas
        exercitationem nisi? Pariatur consectetur quis fugit ipsa illum est quam
        consequatur suscipit ipsam, natus exercitationem amet sapiente odio eos
        delectus voluptas molestiae cumque culpa atque. Dicta doloribus dolore
        quidem, distinctio tempore maiores enim, deleniti omnis qui iure
        necessitatibus eligendi. Impedit veniam harum eum maiores eligendi sequi
        culpa! Perferendis ad magnam, natus vero dignissimos velit voluptatem
        corrupti delectus optio reiciendis a fugiat nesciunt provident eligendi
        ipsam voluptatum quasi itaque sed, veritatis pariatur impedit! Molestiae
        corporis explicabo doloribus consequatur eveniet quod error vel sit
        maxime ullam qui accusamus id commodi iste eum blanditiis ducimus
        dignissimos ipsam, quis distinctio reprehenderit esse. Recusandae ab a
        enim totam quis. Sapiente placeat iusto rerum a tempora possimus
        adipisci hic laudantium itaque ea quos vitae optio commodi sunt,
        consectetur, corporis, modi officia consequatur! Culpa vel accusamus
        architecto cupiditate obcaecati vero unde? Omnis voluptatibus aliquam
        illo, quos eligendi, earum nemo minima facilis ipsum ratione totam odio
        maiores illum adipisci amet optio. Natus modi distinctio voluptatum
        sequi rem nam corrupti explicabo fugit odit ab labore quisquam
        accusantium iure, hic quos.
      </p>
    </div>
  );
}

export default PlayersPage;

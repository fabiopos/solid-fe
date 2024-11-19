import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import { SeasonDetailStoreProvider } from "@/context/SeasonDetailsCtx";
import { SeasonGet } from "@/features/seasons/application/SeasonGet";
import SeasonDetails from "@/features/seasons/infraestructure/Details/SeasonDetails";
import { ApiClient } from "@/lib/ApiClient";

export default async function SeasonDetailsPage({
  params,
}: {
  params: { seasonId: string };
}) {
  const { seasonId } = await params;
  const season = await getSeasonDetails(seasonId);
  return (
    <SeasonDetailStoreProvider season={season}>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl w-full">
          Seasons
        </h1>
        <Separator className="my-5" />
        <p className="tracking-wide text-lg">
          Aquí podrás llevar el control total de las temporadas de tu equipo de
          fútbol. Desde la planificación inicial hasta los logros finales,
          Seasons te permite organizar y visualizar todos los aspectos clave de
          cada campaña. Crea, edita y administra fácilmente temporadas,
          definiendo objetivos, programando partidos, registrando resultados y
          mucho más.
        </p>
        <p>
          Con herramientas intuitivas y personalizables, podrás: Planificar la
          temporada: organiza entrenamientos, amistosos y competiciones.
          Gestionar plantillas: asigna jugadores y cuerpo técnico a cada
          temporada. Registrar estadísticas: lleva un seguimiento detallado del
          desempeño del equipo y de cada jugador. Visualizar el progreso:
          consulta gráficos y reportes para evaluar el rendimiento y los
          resultados. ¡Empieza ahora y lleva tu equipo al siguiente nivel! 🚀
        </p>
        <SeasonDetails />
      </div>
    </SeasonDetailStoreProvider>
  );
}

async function getSeasonDetails(seasonId: string) {
  const session = await auth();
  const token = session?.user.access_token;
  const client = new SeasonGet(new ApiClient());
  if (!token) return null;
  const seasonDetails = await client.findSeason(seasonId, token);
  return seasonDetails;
}

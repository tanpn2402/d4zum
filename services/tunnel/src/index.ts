import * as dotenv from "dotenv"
import localtunnel from "localtunnel"
import { LoggerManager } from "@utils/logger"

dotenv.config()

const LOGGER = LoggerManager.getLogger(__filename)

if (!process.env.TARGET_PORT) {
  LOGGER.error("TARGET_PORT is not defined")
  process.exit(1);
}

if (!process.env.SUBDOMAIN) {
  LOGGER.error("SUBDOMAIN is not defined")
  process.exit(1);
}

async function main() {
  LOGGER.info("tunnel is starting");

  const tunnel = await localtunnel({
    port: parseInt(process.env.TARGET_PORT),
    subdomain: process.env.SUBDOMAIN
  });

  LOGGER.info("tunnel is running at url: ", tunnel.url);

  tunnel.on('close', () => {
    LOGGER.info("tunnel is closed");
  });

  tunnel.on('cerrorlose', (error) => {
    LOGGER.error("tunnel error: ", error);
  });

  tunnel.on('request', (req: {
    method: string,
    path: string
  }) => {
    LOGGER.info("tunnel received request: ", req.method, req.path);
  });
}

// call main
main()
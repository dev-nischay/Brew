import chalk from "chalk";
export const logger = async (req, res, next) => {
    const method = chalk.blue.bold(req.method);
    const url = chalk.green(req.originalUrl);
    const status = chalk.yellow(res.statusCode);
    const time = chalk.magenta(new Date().toLocaleTimeString());
    console.log(`${chalk.cyan("[REQ]")} ${method} ${url} → ${status} @ ${time}`);
    next();
};

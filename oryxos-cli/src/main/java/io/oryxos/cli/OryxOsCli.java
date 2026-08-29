package io.oryxos.cli;

import picocli.CommandLine;
import picocli.CommandLine.Command;

import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;

/**
 * OryxOS 命令行主入口。后续子命令（init / chat / serve / gateway 等）在此注册，
 * 需要 Spring 上下文的命令由其拉起 Spring（TechnicalSolution 8.6）。
 */
@Command(
        name = "oryxos",
        mixinStandardHelpOptions = true,
        versionProvider = OryxOsVersionProvider.class,
        description = "OryxOS —— Java 实现的开源 Agent OS 运行时内核。"
)
public class OryxOsCli implements Runnable {

    public static void main(String[] args) {
        // Windows 下 System.out 默认走原生 GBK，与 picocli 输出的 UTF-8 不一致，统一为 UTF-8
        System.setOut(new PrintStream(new FileOutputStream(FileDescriptor.out), true, StandardCharsets.UTF_8));
        System.exit(new CommandLine(new OryxOsCli()).execute(args));
    }

    @Override
    public void run() {
        System.out.println("OryxOS " + OryxOsVersionProvider.version());
        System.out.println("Java 实现的开源 Agent OS 运行时内核");
        System.out.println("JVM " + System.getProperty("java.version") + "（要求 JDK 21+）");
        System.out.println("使用 oryxos --help 查看可用命令。");
    }
}

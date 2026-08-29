package io.oryxos.cli;

import picocli.CommandLine.IVersionProvider;

/**
 * 版本号取自 JAR 清单的 Implementation-Version（spring-boot-starter-parent 默认注入），不写死在代码里。
 */
public class OryxOsVersionProvider implements IVersionProvider {

    @Override
    public String[] getVersion() {
        return new String[]{"OryxOS " + version()};
    }

    static String version() {
        Package pkg = OryxOsVersionProvider.class.getPackage();
        if (pkg != null && pkg.getImplementationVersion() != null) {
            return pkg.getImplementationVersion();
        }
        return "unknown";
    }
}

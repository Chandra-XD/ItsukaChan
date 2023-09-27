{ pkgs }: {
    deps = [
        pkgs.nodejs_20
        pkgs.nodePackages.typescript
        pkgs.jellyfin-ffmpeg
        pkgs.imagemagick
        pkgs.git
        pkgs.neofetch
        pkgs.libwebp
        pkgs.speedtest-cli
        pkgs.wget
        pkgs.yarn
        pkgs.libuuid
    ];
    env = {
        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
            pkgs.libuuid
        ];
    };
}


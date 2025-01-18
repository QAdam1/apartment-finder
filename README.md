# apartment-finder

1. run
```
sudo apt-get update && sudo apt-get install -y \
    libwoff1 \
    libopus0 \
    libwebpdemux2 \
    libharfbuzz-icu0 \
    libwebpmux3 \
    libenchant-2-2 \
    libhyphen0 \
    libegl1 \
    libglx0 \
    libgudev-1.0-0 \
    libevdev2 \
    libgles2 \
    libx264-155
```

#### possibly cannow run:
```
npm init playwright@latest
```
and skip the next steps

2. then
```
npm install @playwright/test
```

3. then
```
npx playwright install
```
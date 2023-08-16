<img src="https://camo.githubusercontent.com/82291b0fe831bfc6781e07fc5090cbd0a8b912bb8b8d4fec0696c881834f81ac/68747470733a2f2f70726f626f742e6d656469612f394575424971676170492e676966" width="800" height="3">

[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2336BCF7&lines=ItsukaBot+-+Md;Ini+sc+gratis+anj;+ketahuan+jual??;+langsung+gw+delete!!;+Btw+jangan+hapus+wm+anj;+hargain+gw+sedikit+aja;+Intinya+wm+jangan+dihapus!!;+Oiya+waifu+gwe+cantikkan+bang???;+hehehheh+:v)](https://github.com/Chandra-XD/ItsukaChan)

<p align="center">
<img src="https://raw.githubusercontent.com/Chandra-XD/cn-grabbed-result/main/media/gif/itsuka%20kotori%20on%20Tumblr.gif" />
</p>
<a href="https://visitor-badge.glitch.me/badge?page_id=Chandra-XD/ItsukaChan"><img title="Visitor" src="https://visitor-badge.glitch.me/badge?page_id=Chandra-XD/ItsukaChan"></a>
<a href="https://github.com/Chandra-XD/ItsukaChan/network/members"><img title="Forks" src="https://img.shields.io/github/forks/Chandra-XD/ItsukaChan?label=Forks&color=blue&style=flat-square"></a>
<a href="https://github.com/Chandra-XD/ItsukaChan/watchers"><img title="Watchers" src="https://img.shields.io/github/watchers/Chandra-XD/ItsukaChan?label=Watchers&color=green&style=flat-square"></a>
<a href="https://github.com/Chandra-XD/ItsukaChan/stargazers"><img title="Stars" src="https://img.shields.io/github/stars/Chandra-XD/ItsukaChan?label=Stars&color=yellow&style=flat-square"></a>
<a href="https://github.com/Chandra-XD/ItsukaChan/graphs/contributors"><img title="Contributors" src="https://img.shields.io/github/contributors/Chandra-XD/ItsukaChan?label=Contributors&color=blue&style=flat-square"></a>
<a href="https://github.com/Chandra-XD/ItsukaChan/issues"><img title="Issues" src="https://img.shields.io/github/issues/Chandra-XD/ItsukaChan?label=Issues&color=success&style=flat-square"></a>
<a href="https://github.com/Chandra-XD/ItsukaChan/issues?q=is%3Aissue+is%3Aclosed"><img title="Issues" src="https://img.shields.io/github/issues-closed/Chandra-XD/ItsukaChan?label=Issues&color=red&style=flat-square"></a>
<a href="https://github.com/Chandra-XD/ItsukaChan/pulls"><img title="Pull Request" src="https://img.shields.io/github/issues-pr/Chandra-XD/ItsukaChan?label=PullRequest&color=success&style=flat-square"></a>
<a href="https://github.com/Chandra-XD/ItsukaChan/pulls?q=is%3Apr+is%3Aclosed"><img title="Pull Request" src="https://img.shields.io/github/issues-pr-closed/Chandra-XD/ItsukaChan?label=PullRequest&color=red&style=flat-square"></a>
<br>
<br>

> **Warning** : Jika ada bug atau error segera lapor ke ([owner](https://pnggilajacn.my.id)), jika ingin pull req silahkan saja selagi tidak menggunakan rest api.

<details>
 <summary>Cara Pemasangan</summary>

## INSTALL ON TERMUX WITH UBUNTU

[ INSTALLING UBUNTU ]

```bash
apt update && apt full-upgrade
apt install wget curl git proot-distro
proot-distro install ubuntu
echo "proot-distro login ubuntu" > $PREFIX/bin/ubuntu
ubuntu
```

---------

[ INSTALLING REQUIRED PACKAGES ]

```bash
ubuntu
apt update && apt full-upgrade
apt install wget curl git ffmpeg imagemagick build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev dbus-x11 ffmpeg2theora ffmpegfs ffmpegthumbnailer ffmpegthumbnailer-dbg ffmpegthumbs libavcodec-dev libavcodec-extra libavcodec-extra58 libavdevice-dev libavdevice58 libavfilter-dev libavfilter-extra libavfilter-extra7 libavformat-dev libavformat58 libavifile-0.7-bin libavifile-0.7-common libavifile-0.7c2 libavresample-dev libavresample4 libavutil-dev libavutil56 libpostproc-dev libpostproc55 graphicsmagick graphicsmagick-dbg graphicsmagick-imagemagick-compat graphicsmagick-libmagick-dev-compat groff imagemagick-6.q16hdri imagemagick-common libchart-gnuplot-perl libgraphics-magick-perl libgraphicsmagick++-q16-12 libgraphicsmagick++1-dev
```

---------

[ INSTALLING NODEJS & ITSUKA-CHAN ]

```bash
ubuntu
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
apt install -y nodejs gcc g++ make
git clone https://github.com/Chandra-XD/ItsukaChan
cd ItsukaChan
npm install
npm update
```

---------

## FOR REPLIT
[![Run on Repl.it](https://repl.it/badge/github/FadliDarmawan/haruno)](https://repl.it/github/Chandra-XD/ItsukaChan)
```cmd
Buka Shell

------------
> yarn
-------------
Click Run
```

---------

## FOR TERMUX/UBUNTU/SSH USER

```bash
apt update && apt upgrade
apt install git -y
apt install nodejs -y
apt install ffmpeg -y
apt install imagemagick -y
git clone https://github.com/Chandra-XD/ItsukaChan
cd ItsukaChan
pkg install yarn
yarn

```

---------

## FOR WINDOWS/VPS/RDP USER

* Download And Install Git [`Click Here`](https://git-scm.com/downloads)
* Download And Install NodeJS [`Click Here`](https://nodejs.org/en/download)
* Download And Install FFmpeg [`Click Here`](https://ffmpeg.org/download.html) (**Don't Forget Add FFmpeg to PATH enviroment variables**)
* Download And Install ImageMagick [`Click Here`](https://imagemagick.org/script/download.php)

```bash
git clone https://github.com/Chandra-XD/ItsukaChan
cd ItsukaChan
npm install
npm update
```

---------

## Run

```bash
node .
```

---------

## Arguments `node . [--options] [<session name>]`

### `--session <file name>`

Use another session with another name, default is ```session.data.json```

### `--prefix <prefixes>`

* `prefixes` are seperated by each character
Set prefix

### `--server`

Used for [heroku](https://heroku.com/) or scan through website

### `--db <json-server-url>`

#### GET

```http
GET /
Accept: application/json
```

#### POST

```http
POST /
Content-Type: application/json

{
 data: {}
}
```

### `--big-qr`

If small qr unicode doesn't support

### `--img`

Enable image inspector through terminal

### `--test`

**Development** Testing Mode

### `--trace`

```js
conn.logger.level = 'trace'
```

### `--debug`

```js
conn.logger.level = 'debug'
```

## Settings

Now set using switch [enable.js](https://github.com/Chandra-XD/ItsukaChan/blob/main/plugins/enable.js), among others are

```js
autoread: false, // If true all chats are automatically read
nyimak: false, // No bot, just print received messages and add users to database
restrict: false, // Enables restricted plugins (which can lead your number to be banned if used too often)
self: false, // Activate self mode (Ignores other)
pconly: false, // If that chat not from private bot, bot will ignore
gconly: false, // If that chat not from group, bot will ignore
```

---------

</details>
<details>
 <summary>Sosmed Gwe</summary><br>

[![Instagram Badge](https://img.shields.io/badge/-Instagram-e4405f?style=flat-square&logo=Instagram&logoColor=white)](https://www.instagram.com/pnggilajacn)
[![Facebook Badge](https://img.shields.io/badge/-Facebook-0088cc?style=flat-square&logo=Facebook&logoColor=white)](https://facebook.com/pnggilajacn)
[![Telegram Badge](https://img.shields.io/badge/-Telegram-0088cc?style=flat-square&logo=Telegram&logoColor=white)](https://t.me/pnggilajacn)
[![Whatsapp Badge](https://img.shields.io/badge/-Whatsapp-%808080?style=flat-square&logo=Whatsapp&logoColor=white)](https://s.id/pnggilajacn)
[![Email Badge](https://img.shields.io/badge/Email-3b5998?style=flat-square&logo=email&logoColor=white)](mailto:cuancari074@gmail.com)
<a href="https://github.com/Chandra-XD"><img src="https://img.shields.io/badge/-GitHub-black?style=flat-square&logo=github" /> 
<a href="https://komarev.com/ghpvc/?username=ChandraXD307&color=blue&style=flat-square&label=Profile+Views"><img title="Watching" src="https://komarev.com/ghpvc/?username=ChandraXD307&color=green&style=flat-square&label=Profile+View"></a>
[![Twitter Badge](https://img.shields.io/badge/-Twitter-0088cc?style=flat-square&logo=Twitter&logoColor=white)](https://twitter.com/@Chandra_XD307)
<a href="https://tiktok.com/@pnggilajacn"><img src="https://img.shields.io/badge/-TikTok-black?style=flat-square&logo=tiktok" /> 
[![YouTube Badge](https://img.shields.io/badge/-YouTube-e4405f?style=flat-square&logo=YouTube&logoColor=white)](https://youtube.com/@ChandraXD307)

</details>

<details>
 <summary>Donasi bang</summary>

### Pulsa
- Axis: 083848947227
- Indosat: 085785705233
- Three: 08990085223

### Uang digital
- [Saweria](https://saweria.co/pnggilajacn)
- [Trakteer](https://trakteer.id/pnggilajacn)
</details>
<details>
 <summary>Thanks To</summary>


#### Thank's To

- Allah SWT
- Orang Tua
- [Adiwajshing](https://github.com/adiwajshing)
- [Nurutomo](https://github.com/Nurutomo)
- [BochilGaming](https://github.com/BochilGaming)
- [Ariffb25](https://github.com/ariffb25)
- All creator bot
- Dan semua yang selalu mendukung

## Recode By
[![Chandra-XD](https://github.com/Chandra-XD.png?size=100)](https://github.com/Chandra-XD)
</details>
<img src="https://camo.githubusercontent.com/82291b0fe831bfc6781e07fc5090cbd0a8b912bb8b8d4fec0696c881834f81ac/68747470733a2f2f70726f626f742e6d656469612f394575424971676170492e676966" width="800" height="3">

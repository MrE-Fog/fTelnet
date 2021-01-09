/*
  fTelnet: An HTML5 WebSocket client
  Copyright (C) Rick Parrish, R&M Software

  This file is part of fTelnet.

  fTelnet is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or any later version.

  fTelnet is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with fTelnet.  If not, see <http://www.gnu.org/licenses/>.
*/
class BitmapFont {
    public static Loaded: boolean = false;
    public static Pixels: any[] = [];

    public static Init(): void {
        // This initializes the pixels array so that all 256 chars are blank
        // This is so if we fail loading the pixels array from the HTTP server, the client won't crash (but it means the bitmap font text won't display)
        for (var Char: number = 0; Char < 256; Char++) {
            this.Pixels[Char] = [];
            for (var y: number = 0; y < 8; y++) {
                this.Pixels[Char][y] = [];
                for (var x: number = 0; x < 8; x++) {
                    this.Pixels[Char][y][x] = 0;
                }
            }
        }

        if (document.getElementById('fTelnetScript') !== null) {
            var xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open('get', StringUtils.GetUrl('fonts/RIP-Bitmap_8x8.json'), true);
            xhr.onload = (): void => { this.OnJsonLoad(xhr); };
            xhr.send();
        }
    }

    private static OnJsonLoad(xhr: XMLHttpRequest) {
        var status: number = xhr.status;
        if (status === 200) {
            this.Pixels = JSON.parse(xhr.responseText);
            this.Loaded = true;
        } else {
            alert('fTelnet Error: Unable to load RIP bitmap font');
            // TODO Retry with remote embed-v2.ftelnet.ca url
        }
    }
}

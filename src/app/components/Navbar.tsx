import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Home',      to: '/'         },
  { label: 'About Us',  to: '/about'    },
  { label: 'Programs',  to: '/programs' },
];

const MORE_LINKS = [
  { label: 'Founder Story', to: '/about#founder-story'      },
  { label: 'Testimonials',  to: '/about#testimonials' },
];

const TICKER_ITEMS = [
  'NIFTY 50','SENSEX','BANKNIFTY','RELIANCE','TCS',
  'INFY','HDFC BANK','TATAMOTORS','WIPRO','AXISBANK',
  'BAJFINANCE','ICICIBANK','SBIN','HCLTECH','MARUTI',
];

const LOGO_SRC = 'data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACAKADAAQAAAABAAACAAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgCAAIAAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAgEBAgMCAgIDBAMDAwMEBgQEBAQEBgcGBgYGBgYHBwcHBwcHBwgICAgICAkJCQkJCwsLCwsLCwsLC//bAEMBAgICAwMDBQMDBQsIBggLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLC//dAAQAIP/aAAwDAQACEQMRAD8A/knooor3D5sKKKKDKc7aBRRRQRe5YooooMwooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAK9FFFBoFFFFBpGPUKKKKC1K+gUUUUGfwhRRRQO9wooooAKKKKALFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//0P5J6KKK9w+WnOwUUUUEbhRRRQaxhcsUVK4yM1FQDVgooooEFFFFABRRRQAUUUUAFFFFABRRRQBXooooAsUUUUAFFFFAEyrtp1FFBoV6crbabRQZjmbdTaKKAeu4UUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAV6KKKALFFFFAFeiiigAooooAsUUUUAFFFFAH//R/knooor3D5N6linKu6kAycVMVzn3oKpx0uIoxTqr1OpyM0GkZ30KFFFFAnuWKKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAV6KKKALFFFFABRRRQBYooooNCvRRRQZhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/0v5J6KKK9w+TLFPL5GKZRQaXCiiigAooooAr0UUUAWKKKKACiiigAooooAKKKKACiiigAooooAr0UUUAWKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P+SeiiivcPkyxRRRQaBRRRQAUUUUAV6KKKALFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFeiiigCxRRRQB/9T+SeiiivcPkyxRRRQaBRRRQBXooooAKKKKACiiigAooooAKKKKALFFFFABRRRQBXooooAsUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFeiiigD//V/knooor3D5MsUUUUGhXooooAKKKKACiiigAooooAKKKKACiiigCxRRRQAUUUUAFFFFAFeiiigCxRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBXooooAsUUUUAFFFFABRRRQB//9b+SeiiivcPkyxRRRQaBRRRQAUUUUAV6KKKACiiigCxRRRQAUUUUAV6KKKALFFFFABRRRQBXooooAKKKKALFFFFABRRS4J6UAJRTgoPGacQg7UR12KUW9iOipdq9aQhB2obtqx+zkR0UrYzxSUEBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAV6KKKALFFFFABRRRQAUUUUAV6KKKALFFFFAH/1/5J6KKK9w+TLFFFFBoFFFFAFeiiigAooooAsUUUUAV6KKKALFFFFABRRRQAUUUUAFFFFAFeiiigAooopXQFiipP3dIVFF0U4NDKeM4pCpHNSRo0jLEnVjgfU1tRpRqS5ZbBFXdj6T/Zi/Zj8Z/tOeNZPDvhyT7Dp9j5b6hqLp5kdskmdoCgrukfa3lqSinB3OnGf3H8Cf8ABPz9lrwho407WNCHiC848y+1JzJNJjpwm1F/4Coz3zxXf/BnwLoPwP8AhPpPws8PIqRWCebcy4Be4vZQPPldu5YqPoBxXoD641yMA1+l5Dw/hKcHUnC572CwKaTZ4P4x/YO/ZL8TaO+jDwyul+Z/y8abM0Ey/TdvQ/8AAkb2xzX4tftZfsbeLf2aNW/trSnk1bwfcv5dtfsMSxv/AHZlA2qDkbWDEE5Bx3/oTm18xHYxzmuI8eaXo3jzwVrHgnxFAl1Za1Zy2kqSLuGJOA2CRyO3Stc4yrB16DpxoqL7o1xGEUI6H8sQYlcEUlbuuWK6FrV9oE/F1YXM8Eqf3fKkZAfx25qlX5fWpqnJxR85V0kZ9FO2+tLtH+f/ANVY8y7isMop4UHvSMu2mtdgsxtFFFAgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P5J6KKK9w+TLFFFFBoV6KKKACiiigAooooAsUUUUAV6KKKALFFFFABRRRQAUUUUAFFFFABRSgZr6R/Zq/Zd+JH7UHjCTw14G+z2lpYbJNS1C7k2Q2kL7sHauZJHbadiIvOCWKqCw1p0Jz+BXKUW9jwLQ9F1nxFrMOhaDZ3GoXl3mO3t7SPzZpZj91FXIznnJ7V+k3wx/wCCVvx98caEmu+Lb7TvC+8Z+xXZklvk9A8USFU59X9+a4Hx3r13/wAE9fj7qfg74SCy8R6va2Fo0+oazA8v2SW5TzTHDHHMm1gjIWYsc5AAXHP1D8IP+Cu96JYNE+Lng22wxAkv9FZxMT728hfePcSLj37fQZbgsFflxb99dDpoUtdTJ1D/AIJB+OCBa+H/ABxpk97JkpDc2s8G76FPOx+IFfEvxm/Yw/aA+BLSTeNdG8+zjODe2Ei3UB+u0+Yv/A41HpnBr+lf4W/HD4cfG3RD4p+GGopqWncAvjy5FJ6B4mxJGfTcoz2r05VRn2uM19LS4bwWMTjR3R6M8NGasj+LtrbB+Ydas6TJa2erWlzfDdBHMjSD1UMCenPSv6A/2w/+CcXgP4ni9+J/wOFr4Z8Vudx05Iylhf8AX5TsyYCO0mxk5+Yrxn+f3XNK1nw5q134b8Q2slhqNk7QzwSjDxuPb+R718hjMHVy3FtTjojl+qypyuj+m+LWJ7jTbe9ncb5Ikdh7sM9uKz28SMG24zX5yfstftGW3ifw5bfD3xNMY9UsY9kUjtxMg6DPqBx+FfXyaobgtD3FfomV5lRq4aMqTu+p6lDFpRseqSeJiZQzEc1dfVxepmNhwMn2rwy81SSBwDkk9B9a+af2kv2grL4c+Er/AMD+H7xR4k1G1bGG4t427t/tHsBzRmWJoU8NKdWVi61VSiz8vvipq1rrHxU8SeILFcQapqV1eR567JpWcZ+gauSS4d0LBfp2qfR9N1rxZrcGj6JZXOoX13mO3t7WPzZ5ZjjYirkdecntX7ufsd/8E0dM8KQ6f8Uv2iIBqOqKBLDoMi7rK1nH/PwSR9olTIzHtES55Mmfk/NsDgKuYYjlpx908anhvaTdj8sPgd+yb+0D8d7iKXw74fks9Mfk6ndSRQ2pX/pm0jqXOM8KDjjJ5Ffcun/8EkfiDNZrJqPjLS1uMfOkEE0iKf8AfcR5/AV++VsDEm1uT3rzL4pfE7wT8HvC0/jj4i6lb6VpMBCyTzyYO5s7VSNcySEnghFOOtfYLhjBRXv7m08IoK7Pwa+IP/BL341eGNJOq+EtQsfEBiz5kCMLabtt2eawjbPOdzrjjrnj839f0DxL4X1aXRfE1hNYXMJw0c6FGB/kfwyPev2H+KP/AAWB8N6ddT2fwj8KnU2jOIbzUZ3jgb3MCYLD6uK+PPDfj3UP+Chnx68MeB/jM9poF5dZsLDVNLg8qXzUjd7dLtWcxzxhlKjIR13ko65Ib5XM4YKD5cK7k4fCqtVhh4fHNqMV3b2R8UrIrDqPzqSvpn9qH9i/4x/so6nDd+MoV1Dw9qMjJYaxagiGZl6pJG2HglGRmNwOvBPOPlmKXbnivC5leyOTMMBiMHiJYbEx5ZrdDKKKKZzBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFeiiigD//0f5J6KKK9w+TLFFFFBoV6KKKACiiigAooooAKKKKACiiigCxRRRQAUUUUAV6KKKACiiigDf0XQta8Sana6D4dg+1X17cR28MWcbnlOBzg4A7mv7Af2e/hFovwL+E2l/DPw+q+TaKZZpsYkubqUDzZn92woUfwoqr2zX8yX7D+l2erftZeB01JTJBDftOYwdpZoI2lHPOPuY79a/rNtyqQrHn7ox+VfdcLYSMqf1h9JNfcetgKPMrn8r37fcKN+1348MgwTqEXJ/69LevikWoDEAYPrX6Nf8ABUrwfq/hj9rCfVbhAtprmk2F1FJ/z0njVreVvx8pT+Nfnn0zmvm82g4Y+tfq7nPiJcs3E674W/FLxz8FfHFr4+8BXX2a9tsqysMxzRnG6ORcjdG2BkfQghgrD+l/9kT9qzwv+074Mlv7SP8As/XtK8uPVNNZt7QPIDtdGwN8T7W8t8DODxxX8tUqh1yw+lej/A34reNfgN8T9N+KngC7a1vrBikqZ+S4tZMebA4/uvtHY4xkV35HnVfB1k6b0NcNinF2Z/YVcROwAXhvWvkj9qL9kLwH+1D4djbV5xpXia3LNFqwjD7gf4JFyCV/2gQ65+Vl5z9B/Bz4leH/AI2fC/Rfin4aG201i3WbymbMkEg4khkHGHjcMpHfAPfFegNDj2/z9a/QXGhjqXPOOrPcUI1IH8kXxk/Zt+L/AOz/AKsLXx3YS2w8xhbXsQLW1wqYO+GUfeGCDghXX+JR3r6H+0h8T/D+mJpTSwXiR/dN3H5rAemcg/nX9aet6HoniTTJdE8RWcN/ZzjbJBcIJI3HupBBr5N8X/sA/skeL9cm8Qt4Ot9KubnBnOlSS2KSEZxmOF1QAZ4AUY59a+frZHjKUr4GcUut3Y4XhLvQ/nk1D9o/4ma5pz6Y0tvZo4OWtI/KYj0zk8Vy3w0+BvxS+PviGXS/Alq108RX7ReXDGO0tjJnYZpuSm7a20KrO207VODj+i/w9/wT0/ZP8Na1DrA8LR6l5X/LHUppbyE59Y5XZD+Kmvt7TbPTNJ0+PS9HtorO2hG2OKFAiIPQAYAFRHIMbXusZNNeTuP6tLY+Ev2O/wBhj4Xfs0RnxPKI9X8W3gxdaki7Ywg+6kKnpjn52y7Z5JwK/QeRxOc4rIEYDlx3rmfH3jrR/hp4N1Hxr4gO2z023e4kbON2zGEXrl3+7Gv8T4XIzmvoKVKhgMKo042a6m9KiqMHUkjyD9qL9pvwD+yz4APivxbm71C73x6bpkbbJbuVMbvmw2yNNwMkhU7cgAMzKrfyz/HH48fEr9oPxo3jH4iX32jy9yWdsg2w2sJx8iDv0GXbLtxuJwMa/wC0P8bPHn7RvxS1D4meNrhlinbytOsc5Sys0z5cY7FyOZHAG9yWxzgeHtHjjpXxOcZq6vuQPKxOJ9o2kVbiCOZQSK+o/wBiC0En7UvgNVXkeINOIA7kzAH9Ca+aK+9f+CY3g/VfF37aPhZdNQSLosd3q8meifZ4/KR/wkmQfjXxdefJsdeQNyzrA0/+nkfzS/U/qn+MXwx8H/Gn4bap8LPH1lHfaZqsfKuATHPHloZV9Gikw4wRnGO9fxU/Ej4da/8ACbx/rnw68TptvdE1CewkOMBjAQAw68MDnqfqa/udYJLgGv5Lf+Coen/2Z+2bryK+77bYaZfSe800C7z+OBXNQm5SP3DxuyLDxoUc0pq07uMvO6un8rfifntRRRXoH84Ir0UUUAWKKKKACiiigAooooAKKKKACiiigAooooAKKKKAK9FFFABRRRQB/9L+SeiiivcPkwooooNAooooAKKKKACiiigAooooAKKKKACiiigAooooAKUgjBPevSfhX8J/GHxk8YWvgfwTB5t3cgu8j8Q28C8NLK38KJ1J/AZYqp/aj4ef8Ey/g94O0GOL4hape+INTYAyiG4lgsN3tErAt9S1eng8oxGJ/hI66OFlM/A9Udm2KMk9hSFSp2sMEV/Qj44/YT/Zn1rR20y30dtOnONt3bXE6yx/TMhGPwr8vv2g/wBjzxB8IITrXha/Ov6UGwSI8Twg/wB/BO4D+9+ldOL4dx2HpOs0nbojWWCaRz37EuuaVof7VvgY6k5X7TqS24wM8XEbxFv+Alwa/rIjjdRyfxr+KbQ9TvdC1W28QaTIYb2ymguIJV+8jRSpJwffbiv7N/DXi/RfFmi2niDQ5POs762t7u3k/vw3Eaup/XH4V9FwhVapPDta3bPSym0Xqfm9/wAFZ/hR/wAJh8EdK+Kum2v2nUfCV2Fl2nDLY3Xyu/fOyURrtx/HnPGD/O+ww+TX9n3jTw/pPjbw1eeF9ciWW1v4XglVhkFHGD/Q/hX8hfxy+F+vfAv4r6z8KvEnz3WlzsqS7dongJPlygZOA4B4y2MdTXHxbl6pYhVk/i/QwzXDWqupHZnmFRrnPymmZyoNPySucV8dzOGqPFdVxeiP1X/4Je/tCJ8O/ihcfBTWZzHoXihVezjc/LBqUeS7Ak4/fqcHpyi9elf0KSy4XdjpX8WWhatf6Dq9trumOYrmzlWWNl6hkOQa/r8+HXxP0L4m/DvQviB4fObbWrCG7EZOWiZ8hkJ9VII5A+gr9G4SzL6xTlRkvht+J9DluI51ZnevebTjFNW8yTkViveKWpn2tf8AP/66+00Wp68aaWpt/bCPvLTlvsdBWEbtB1/z+tJ9sT/P/wCuq9stieWzN/7f7H/P41+Ff/BVL9ohfEd1Zfs9aJKTbQL9q1hQcq7S4a3j+qxkOTnPzgYGMn9oPEHizQvCehX/AIm8RzfZ7HTraW5mkxnakQyeMiv48fHvjXV/iV8Q9f8AiPrxP2vX7+a+dWO4p5p4XPGcDAr5DifHqnSdJbs8vNcRyUnTXUwzI2NoPA6VHRTscZr8wqVW3aR89STluxtf0Mf8EcvgvqWgeEfE/wAZ9YhCNrN0NK04kESCGyLCd8/3XlOwDGP3WcnOB+F/wf8AhX4w+N/xI0f4Z+B7fz7zV7hbdSD/AKrPzNIw/uIiuzHIxgDvX9p3ws+H+g/CrwLovgPw8oFpothBYpgY3GIHLkc4Lkkke9cFd9z9l8I+GKWMx88yrq9Klblf9531+Vj0OASBcP2r+R//AIKZeIT4g/bS8R4h8r+zbSw02TnP762gTf2H94V/WpreojRNJm165H+iWf7y6f8A55Qj7z474r+HD4n+NtQ+JfxG1z4gaxK0lzreo3eoSu5yxa6meXnpk4YD8KjC7n2XjlmCWBwuEirqcpO/ayta3nzfgcUQdpkP3R1Pakr60/Z8/ZM8Z/HpF1i5u49L8NSYAldfMluSM7vKQMudvGfm7iv148E/sB/sn6Xo8Wi6r4em1gRfdnvruUTH/e8hoo/yQV6jTR+S8O+GOa5xR+sYdxjDo5X1+5M/nUAJ6VJ5TYzX9HHjz/gmL+zx4t0ZIfh0974UvFJLMs0l9bEHHAgmf5T15Vx1r8RPj5+z38Tf2cvG0ngb4maebaYFjbXMRL2l3GCP3kMnG4cjKsFdSfmUZGeerWUHY5OJuAs1yTmniYqUI7yi7r9H96Pn4gjrSVK3GV9KirWMrq58WmFFFFUAUUUUAFFFFABRRRQAUUUUAFFFFAFeiiigAooooA//0/5J6KKK9w+TCiiig0CiiigCxRRRQBXooooAKKKKACiiigAooooAKCM8GilHJxTRdP4j+j7/AIJzfCXQvh/+zdpfjC5cSav4kMl3OCuDHCjmOFM5OfuM56ctjsK+ufEtyox5ZHrXjX7M+sHVf2Y/AOsxps3aRHayDO7bNaM0Uq54ztdWGcc4rstcvGUbX53V+xZHRjRwMJW3PqcDTXKjndcvC4O9hyK8M1ny3do5MMrcEHoRXo2s3Sy5cHsa8Y1OTfKcHNdlWalokLERVnY/En49+E2+Gfxb1fwtax7bJWE9qf8ApnIWwv8AwHGK/pG/YC1W98Q/sp+F7nUnElxZxy6eXAwGSzdolwMnAwuQMnGcZNfz7/tZTf2z8abwH/llbQ/+PF6/f7/gnhoh0n9lDwvvl3/2jHcajH/1xubibZ+e018rw/aOcV49OVnDgrqbPt/y/evzs/4KEfsjXn7RPgyy8WeCRFH4l0DzGUFcNdwMuTEzZGCCo8onOXO3jcSP0TVRGOTUT3qwZZDz7GvqMZhKWLoulVjdvY9HGUvaRsz+Js280MzwSqVdDtYHqCO1OVeOa/b79vH9iePW5J/jP8I7JUvSrTazZwrzcSnBa4QDADH+JQPmwGJLlmb8SsnpX5Jm2WVcFVdOqtOjPBq4Hk1HxHG4v2r91/8AgmB8RrjxB8Bp/B+ryl9Q0O8cSA8ARXQE6Y9hvYfhX4UxgMDkZz1r9M/+CY/iXTrHx34k8MalKYReWSXKEck/ZWYEY+jj8BXocKYh0sYl0kPLpNVlDoz9wW1QButNOqg8ZzXmx1VSc5NJ/aqepr9SqVtbI+utbQ9L/tV2HK5/GlXUmJ+7+teYHUY88ik/tONfmC5/GojLW5C1dj55/wCCg3xGPhD9l/XbYXAgbWmg00nGcxSyq0//AJBWT86/mzjDAcniv17/AOCnfiS7vY/CXhcMRauLm6nTs23YsZI/F/rz6V+S/kqcspwDX5hxXinPFuPRHyec171nS7DI+9SsgdORkDrTFXbX7Yf8E8P2Ep7rUrH4/wDxitsR2mLnRdLnX70/Pl3Uwz0j5aJccthsjbg/JXvuehwpw9js6x0MHhKd19qT2iu7/wAj6q/4Jf8A7Gd18DfB8Xxo+IcQj8T+IInjW2fiS20+UL8jDs8mDnkjHHbNfrxHIJFz+lcVaMVYHv8A/rroIJDtH+f6VyYl3dj+0eHsioZRgYZfhvgWvq3u/mfOf7dXinWPBX7HvxH8S6BJ5V3Hodxbxt6G72wZ99u/djvjGR1r+SP4TfDu3+JXxH0nwVeTNBBdzbrl1G4rbRjdIRyOcYH41/WH+3xZf2z+xj8RrDPl+XpP2zPXItJY5XX8UDHP+zX8xH7Hl8D8etNDKD51vdQD/ton/wBaurBRSaZ+H+JtD2nEeAo1H7itdd/ekfu74ZstI8P6bDpWjxLAkKhVVPlVVXoAO2K9l8NXJmxk84NeBWjujg5zXq3g+6CyCRjwM17GIilBWP2LBVVTaitD6W8OXTDCSd6+c/8AgoB8B7b40/sv6+dLgVvEPh+3k1fSJxgOk8CnfEG/uzRllYc544OMV7po11+7XYORU3xV8W6T4b+B/jbxF4hl8izsfD+pzSP1xttZePxrxqsLyOniHC4fF5PiqOJjeDg7/I/jMPIP4UypG4XHrUddUFZWP4Ukkm0goooqxBRRRQAUUUUAV6KKKACiiigAooooAKKKKACiiigD/9T+SeiiivcPkwooooNAooooAKKKKACiiigAooooAKKKKACiiigApVGTikood+hUZWdz9R/2A/2ntM8CQyfB/wCIFw0VpfTiWyuXb93FKww6sMcbztO7PBFfql4m1Lz40UcV/LRONxBxn2Ne9fDf9qv44fCxINO0PVjdabHkNaXYMy44xtdj5gxz95mHPQd/rcl4h+r0VRxU722PVo5lyRsfuRrGoPCNvYivnX4o/EzSPhrpQ1rWV83ztyQQo376abjaiLg5zzk5444Oa+B9a/bn+LniA7fItYP+Alv6ivGk034rftEeKI7TTILrWtQJPlxQJuWPd3ZmKxxx8fMzMO2Ae3sz4gp1IuOFXNPogWMdV2SLngzQPFP7Qvxdg0DT/m1DXLoJu+8Ik+85PtHEHfBxnGMjNf1xeEdA07wtoFpomkQrb29rDHBDGvSOKIYRR7Dr+NfC/wCw/wDsWaH+zl4fm8U+JYo7rxXq6R/a7mMboBGgJVYHP30yzZkAUNwMcc/oEsqAEnp2r0uHsvrKm8TiI2nLc7sHC2o27uzGOBziuXur+RWCgZzWhf3S5we1cfdXiu+MV7rfKerGldak+oTiWPdkA9s1+QH7Yn7D8XiiW8+Lvwlj2a0My6hZqAEvgOdyDvctzxx5uMn59zN+rmqzq6ZU4rhZtVRQTjOK4MfgqOYUXSqrXozjr0rqx/KyYpYJXgmUo6EqysMEEdQRX0L+yd4g1Lwz+0T4ev8ATXCtceZZuD91kn2gg+3Ffdf7X37MNp8QJpviT8PrdYvFG0veRKQqaiF53FccT9ctn5/QYr8ntF1e90TVrTXdOdobi1kWRGHBBU9K/NMVh6+U42DnC6i7+qPJjS9lUUj+kb+3m9R/n8aBrpPBINeJW3iPTdW0fT/EPh64+1WeoW6TxydPvdR+FKmrTFhmv0yK5oqa2Z7axWiPbTrre1IdccjtXlMWpyFKdPrtpYWNzqepyeTb2cRmlfrtRep/WlVrKlTc30FKso+8z8r/ANuvxdq/if44XFlqDYj0e2t9PEY6JIkaySD6gyDNfGBro/Gfiq88beNNZ8W3bs51O+nu8t1LSnJJ9+B+Vfsb+xN+xtH4Fe1+Lvxbtlm1Vgk+m6dJ92zbkrJMv/PwP4V/5ZckEsVKflOdP2+Jc11OXL+HK2d462Hdl1fRLq2zW/Yd/wCCfOm2EVj8ZP2hNPFy022XT9Bu/k8vHPmXkPOc5BSMkp13BuMftfpy2tnbpbWqBUUYAHoK8l0++UEZ4PfFdrY6gNo9K8urS5Yn9ccLZFgMnw/scHC17cz6yfVtnosM6b81t20o2jHv3rhLe5J5rdtLmQhcc9a82rT5nY+shU5jZ8QaVp3iTRbnQdWiWa2vInilRuQyOMEHp1Br+ML4zfCjxh+yX8fr7wFrNzv1HwvdGSCfb5azoOYLhRlvlYZDDJCuGXJ25P8AaDHNvXkYr4w/bg/Yx8Mftg+AwsRS08XaUj/2fduP3c8b43284/iVsAoSfkcBucYrTDS9nLU/N/E3hevm+CpzwTtXpy5o6fgfEvwX+LPh74v+Fl1vR223Vtthv7c9YLkD5kzn5h6Nxn0r6P8ADszJKsanGM1/PJ418A/HX9lnxqNN8WWmoeF9bQtxKpRZQmPnilUmOaI54ZW+oHGfdvDv/BSL46aJpy2Gq2Gj6i68GV4JIiR7iOUAmvYqYqM4pH51kviLRy+gqGcQmq0d/d3P6MPC8rJBuf5sV+Sf/BTD9rLQ9U0Kb9m7wHdma4aZTrkkR3RosR3JbE55cSqryDnZtCk7twT4b+Jf/BQ/9pjx54cbwdp2o23h7S5M7otKh8iRgexmDeYB1+4y5zznivjH7bNdStdXJLyysWdmJJZj1JJya5akE3dHLxV4s0MbgZYPLYyXNpJvTTsvXr5adRmc80UUVcVZWPwt7liiiimIKKKKAK9FFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/1f5J6KKK9w+TCiiig0CiiigAooooAKKKKACiiigAooooAKKKKACiinpFqEzBdLh+03B4igB+eWRuERBg7mZsAD3pxi5O0dy4QcnYtEqSPSvq34DfsN/tB/tAMupaBp0Oj6UNrG91WXyV5zwkaq8kuMcmNWTkfNzX6vfsbf8ABOrTfhla23xN+P1vbar4ouRG7aVPBusrMpkgiJ2ZJJPmxvKsiOrKrNyR+qDFIjljxX3WQ8KKrTVfFx+R7GFyv2m+x+Ufw2/4JGfB/wANXSeJPiZrGo69fbRvt43+zWJ9R5eWk9Okid85r9G/A3w78A/DPTTo3gHQ7HRLYgBksohFv25xuwSWIyeST1r1JjlcVlSxhVOK+0oZRh6FnRge1HBUKEdFYRpAFIzWJLMQpGaklZgTyayZnIBr0JyduWxpQpRfwlG+u2UnHpXF3l2ea6C/nyx4ri7+4yOlclWdtLHQ7RVjO1PUJNmGPauAurw/d9a19VuiRx2rgp52L5rBPqjGSTdy1ehXO44zjrX5c/tlfBLTLEJ8UPB8Ai3Sf8TSNBhFj7ze2OjdjnORjn9J77UEERTPOK821FrW/jks79FkikBUqwyCDXl5vgPrlFwe5xYmgpK6PiP9kfxfe6t4SvvCd4/mJo7q8Z/uxzZ4+gKmvrG4vxbONvNfnB4l0SX9nD4zR6vpW8aLqR8mdDyPIkOXUHrxgEelfckGuQalFHdwENFKodCOQVYZFc+X4/lprC1PjW5wwny/Eei2+rKI9xwK+VP2sfihdaD8Pv8AhF9PYxy6wxRmXqYo8bh9CWFe3XMxZVCnGe1fBenW9x+01+0ENPv7Qv4Z02Gfz23ZV7TAwFGB887cYzlQM81Gb4xKi6EPjlsbUk8VWp4an8U2kv1Pev2IP2a9G1h2+MHjeD7RHbTZ0SN1+UyLyt0c9dgOYxjAkAbPy4r9e9MuPKbbng+9eHeG2s9GtItO0yJYYIlCqi8AAduMV6Np+og4Br4jEYdxtfc/ozhnLaGT4OOEpav7T7vqz2bTr9jtH1/z1ruNOvicL1FeL6fqAXFd1YaiOM151WnzKx9nh67kexWF30zXbaVcKwxXj2nX4GFrt9I1AYwfevLxFLlPfwjuj0tGB4HatO3OHzXKW0+/pya3IJCW5GP8/SvPblc6NVqtyn45+HHgL4seHZPC3xD0q31axkBzFcIHAJ7jPQ8fpX5SfGr/AII6fBzxHqR1X4S+IL/wqszEvZToNSs0HYRKzRSrxn70z/4/sBayNngZq3OhlRS3anGc7ni51w7l2bUPZ46jGcn9q2q9HuvkfyCfHX/gnb+0/wDAdrjUvEWkQ6vo0J+TUdGlN2hXnl4isc0X/A0HHNfCyyDkjpX97LeSq4OMgZxivyk/bF/4JveE/jZolx4x+EcNro/i2PcfsiReTpuoMehnij+VJR3kjT5geV4Fd0KrW5+F8UeCbpxniskk2l/y7erf+F9X5WP5jlbdTq0PEGlXfhnxBd+FdXha21Kwdorq3YbWhkUkFGHYggjHtWapLDJFd0dj8Ckmm4tWaLVFFFMQUUUUAFFFFAFeiiigAooooAKKKKACiiigAooooA//1v5J6KKK9w+TCiiig0CiiigAooooAKKKKACiiigCxRRRQBXooooAK/T/AP4JZ/BzTPiD8aNT+IWvxC6s/CVtG8UBwB9uuiwt5T3xEI3cAfxhDnjB/MCv07/Yv/ae0j9mb9nrx/qrkXOr6pq1hDp9iTsEpS3/AHkjvhtkcW4bm2n7wHevQymrRhjIOtKx0UavJrY/fP4lfGD4bfB/SF174m6vb6LZNuPm3DY3bMZWNFBeSQ54VVOe5HGfyz+If/BX74Vw6tNZ/DDw1qOs28LYFxfONNEg9VjKzSj/AIGi1+MHxB+I/jn4p66/ifx5qdxqd1INsZlfMcMfaOKNcRxoOwVR7k8Y8xkj5BxX0eacT1r8tDRI6lmVeKvRdkfpbqv/AAVZ/alvE2aX/ZGnA94LVyf/ACJK9caP+Ckn7X90Sf8AhJo1zzt+x25X8jH/AFr4HAxxV2MkZxXzWIz7G1f+Xsl6GFTH4ip/EkfdkP8AwUi/azsG3XOqaZdk/wDPbTowfzQpX0F4P/4Kx+LrfT0t/HfhCzv51XBksbiS1DH12yeeB9BX5LzDdimRx/Nu9KeHz3G0nZVW/Uqlj60H7rP6Gvh7/wAFCf2dviNFbQ3F5caFf3IIFrqcfkHcOoEhPldxyzrntnBr6Zi1221a1W+siHhlG5SDng1/KjMmAAK6Dwp4z8c+BNU/tzwRrl7pFwAAxtZNquBnAdTkMOT19a+ky/iKrL+Oz0aWZac02f0x6lKoO0nnFcTq86xDavO6vyD8G/t9/HHQ4Y7TxWLHXFXhpZbZIpSPrGF59zmvWl/4KD+FbgCLX9BvImbvbkSD69uvp26ZPWvoaOe4OXxTsdkc2waXvTPuy5uGkbIOfxrkNS+fhDye9fKtt+2t8IJkL6hHfW27oGQGq7/td/B0/vlubhvQBMmuh5zgo684PMKFTSlK51Xx68BL448FzRhA1xb5kjPU18e/s4fF1dK1KbwN4vlaGJmVbaR+QjcgqfYnGPT8a9h8S/tk+CY4gnhrTbu/kzgrNi3TH+9hs/lX596lKt/fy3mAPMYt09a+Rx2ZUVjfrdJ3PMxUuqPuP9oD4v21nbS+DPDbiW4njZJplb/VgkcAAckjPfj37e9/snfDZfA3gMarex/6VqREhY9RGB8q49q/JhQQc1+nHhj9s74aR6LDb6rpt5YyxDb5UQWZAB0w+UJ/FRXBXx/1mu6j0Po+FMZhsPiFWrSS9T7ytJijDFdpp142BzXwTB+218DIGxqR1C1B7/ZzL+iZ/nW3bft1fAGID7M+qXOO6Wbr+jAfzqJzUlufr1DinLE71MTFfO5+iNhe5xXd6fdthT9a/JXUv+Ci3gHTZ2j07w7qM8HO1pyISw91AbH515L4k/4KZfGa80+Xw98OrGx8PWMhysirJPcJjoUMrtGp9cxt7YrgqWR3z8QsjwiX71z/AMMX+bsvxP35sL141N3cjybOL/XXT8Qw7s43t2zg4rwXx7+3f+yz8KXubO+8ULrF5ZYEselRG6hG7OP9IGIOecfP2r+bjxx8QPHfxOvBqnj7XdQ1ibO7N5cGUA+wwAOnYVw8sShRjiuDEQcnY+Lx/jVj1b6hQUY66t81/lZW/E/aLxH/AMFofE2k6oY/hb4IjjeLOy+vL5zkHoQkaJj/AL6NfM+pf8FWP2u9QCJaX2mWG3OTb2EeWz6+Zv6e2OvNfngEJ+XNVvL/AM/5NclSgk0fA5h4icQ4tp1cXJW7Wj+SVz79b/gpx+2RDJvPiO3k3dpbG3cD6fIK7vwJ/wAFYv2p/Dmrrd+KG0rXbIgh4JrFIWz2KvFtx75DdsYr8yWXdTqKuHULNGGH45zyk7rFz/8AAn+tz+g34Xf8Fjvh1qOrxaP8UfC99o0cwwLyzf7ZEG/2k2xsg6d275x3/XH4Y/Fr4UfF/RTr3wq8RWXiC2Tb5rWkmWi3Z2iSNtsiFsHG9Fzg4zg1/EOrZTaewNdj8Lviz8Sfgh4zt/iD8KdYuND1m0z5Vzbt/wCOyIcpKh/ijkVkbuKccO5LmPvcm8Y85Umsxnz0eu0bfcj9iv8Agsn8DPDfh/4heH/2gtDX7PbeJIxpupIiZ8u6tFHlSE/9NIzt9jHnPOB+JDKqsdnTsfav1Y/a/wD2yPDH7UH7GdhqV1AbLxRpGs2qajYRglHd4pj5sYwcKdpBB+7IGXnGT+VCrlAPStaU/ss+H46+o1M0eJy/4KkVL5vf73qMooorc+MCiiigAooooAKKKKAK9FFFABRRRQAUUUUAFFFFAH//1/5J6KKK9w+TCiiig0CiiigAooooAKKKKACiiigAooooAKKKKACv1S/Yw/Y/0b9qz9mbxhZ2zJa+KLLWLO40S6kGYlk+zhZYJsEEQzrgMcHa6o/O3B/K2v1v/wCCQfxq0L4d/G7Uvhx4sciw8YQRW0AZsL9siLGJe2C4ZlU5+/tXHzZGCstT6ng6hga+Z08PmD/dzvH/AMCTSfybX3n5s+O/hr8Qfhb4pvPBPxL0mTRdSsZDE8Ep3FivV0YDy3ibjY6O27nIHGeCliyBg9K/t2+LHwC+DXxn0RtB+K3h2y8QWq5EAvYg8kBP/POVdsqdidrjJAznAr8r/id/wRf+HXiDVJJPgV4ovdC8wlo7HVm+3QgDsrjy2HHqCc1EsXzaH3me+D+cYVKWXR9rRe2ya+96n86RjA6HP+frSqu2v1T8Uf8ABHf9sTR9VltvDS6HrFqn3Z1vjak+224jQfkxrzPUP+CXH7cVg+w+Ebef/ah1Sydf/R2f0rN1E9T4CvwZntOfLLCTv/hb/K58B4apV+7X6H+H/wDgll+2Xq3mnV9J0vSNmNoudRRi+c5x5SuBjHOSOvGa+kvDP/BGHXNZskh+KnjeC1jZczQaNBK8gb0WeXyQB77Dn0rVSR2YHw84hxvMqWFatvze7v25rX+R+LxrtvAfwz+JXxS1geH/AIZ+HtR8Q3pxmKwh8zbnpvdisaZwcbmGcHGcGv6Mfhd/wTm/Zj+FNji60h/EF64Hm3GpOJVbbnBWEARRnnqq88Z6CvqK40TQ9I02LStBs47O3hG1I4wAAPwxXRTqK1j73KvBTHyb/tCuow7Jc1/ndW/E/nv+HP8AwTg+N/iecTeOprLw5auoZXEyXsp9ikTgAj/fI969603/AIJm+DNIkkbxh4kudUB2+WLa2S129d2S7TFs8Yxtxjvnj9b5LUpJkCsHUoI5Gw3NbR30PuV4WcP4VfwnP1k/yVl+B+az/wDBP/4G6dFujbUZW7+bcAj8Nqriua1D9jP4J2i+V9mvD7/anP8A6EWH5V+iesqIMqq54rz/AFG0EoJA64rvw9JS3FiOFsrelLDQj8j82/E/7D3w5v4c+GL260ucfxvicY9NuU/nX5p6jp507Wr7R/MEv2O4eAPjBfZ3xk9a/Z39p74g/wDCs/h7NcWLeXe36tBbnrhiPvfhmvzk+CXw7tdZuT4o1qEyRxP8gb+M9SSe596eIoKK0PwPxOrYbK3FUo2a3PnNowrbXOD6dD/Ov0e0j9j74bb8ard6hc+n77Z/Q14j8bPg+blG8UeEoduzPmQgckDuPp+tfTn7NHxC/wCEv8HwafqEmb2xURPu+8wXgH+lenkeHoV8QqNWJ+ZLNKeIw8a1OXr5DIf2OPg9w3mahn/rtW8f2NPg/NBtEmoDPfzgf5g19MWqDYD3NdNEqlBiv0ZcP4J6ci+R42Jx1WDvSZ8Naj+wF4I1OP8A4pfWrrT5D955445VwP8AZURn82ryHxf/AME+vjH4daK90G4sNYtZiQggnRJ2PoEkKZP0NfrZokSjkqK7fTtsUiuFHHAx2rkxPC2DqL3VZmEc8xcH707o/mp8V+CfHnw9vGsvG2hX+lYbbuuYTGM/qK5hLjecjpX9Wf8AZVt4h0mTRNRiimtpxh0lQODj2NfPfxE/YE/Zv+Ihmn0vSpfDd3KQUm0qTyUB5zvg2mBgeMARLjnnmvk8w4UrJr6vb5ux6VHi2lBKFY/nZzkfLURi681+v+v/APBJXxVnZ4H8Z2d5cSZMdve2skDMB/txGUH3+VRXgurf8ExP2u9NLGDS9MvsdrfUEz+Uix18/W4dx1OX8Nyt21PWw2f4Kqv4qj6s/PryvkxmkEQ3da+3D/wTt/bEEwhPhDP+0Ly32/n5ldn4Z/4Jj/tQaxqken+IIdK0USKSn2i+SR3x2CRB/wBSKzjlGMqtR9hJfIeIzvBU1/Hi/mfniYuAM1reDPAvjL4leMLL4f8Aw+0u41fWNR3C3gt13fdxkuf4EGRukbCLxkjNftd4A/4JE6JBeQ6h8T/GF5cRgDfZaZElupPOQZJPN3dsYRa/Vb4R/Br4T/BzRV0b4aeHrLR8LiSeCP8Afy44zJKxaV+OPmcj8697B8KVpRbqqyPnsfxnRoWjR9+/Zn4Q/tS/so6Z+zT+x1a3GrzWmo+M9S1awfUL5BiJXRJv3cfJ3rzuL8bnZjgZwPy8t23wq47gGv13/wCCufxh0rUviXpHwQ0lvM/4R5ZLu/KkFGkutphXGOqxAOef+WmMDHP5BR3AIwo47CvFz9YeNeFOhG3KrPzPf4bq13gVPFSvOTbv67ImZdtNqSTtUdeOj3GFFFFMQUUUUAV6KKKACiiigAooooAKKKKACiiigD//0P5J6KKK9w+TCiiig0CiiigAooooAKKKKACiiigAooooAKKKKACr+m6le6Tex6hp8jRSxMGVlOCCOnNUKKipG8bF021JSW6P6av2G/8Agp94J+J/hm2+HP7QN/8A2X42QhVvJh5WnagcY3iVjst5pMA+USFd9zLt5z+vsflOVlTBBGQfY1/AxX2L8D/2/v2mP2eRBp/hTVo9U0mLrp+pxm4jx6RsGWSP32MM984Fed7B3P3bhDxer4flwmaRc4fzrVr17n9medy4qjIvyk1+KnwT/wCC0Hww8UpaaR8YfD154cvpsq00L/a7YEe4Alwc9kbGDk9K/Vv4Z/Gj4XfGTSDqvw116x1qNQC5tJgzJnOA6MFkTPbei5xxWNWnKLufuuVcZ5TmUXHDVbz0tHaT/wC3d18ztJgQxA9K5y/OFropypYgVh3aNjpWSrS2Z7anfU4TUUIOUFcLqkJ5VRXp97HlicVw+p25Zgcda7aM2t2RUnzKx55PBkbsVx97EwOCOK9PubMsCwHY1xl9bsSAFr0qVW255uJouSPOdRs/NHTNef60qWj7GHJ5617Hd2uMAivyF/bt/aS06C3Pwf8ABMpN45kj1W6hPzW6/LmBH7SNysw7L8vO7K+jTqWPhuI83w+U4Opi6u6+Fd30R82/FHxhq37SXx2j8OaEc+HLM747zOVNopy8+31bIAXd75r6ug0S10q2hs7KERRRAAKvA4ryP9lj4a3qeDJfHVywA1YiKNCvKxwkluT1Dlhxj+HrX1rNo73BCAda6nLm3P8APzj/AImrZlms6tR6djz2LRkvE29Oxr4OWLUv2bfjTeFQ0mm3BwsSDaPsv3olHqYpBuxn5sY4zx+mKaE9vtdBXif7THw6l8VfC25160UvfaKwmiVRkur/AHx+g7dqqD5Hzw0ktmeTkmaqNVYea9yW59VaM1pqWlW+qWLiSKdA6kdCDzXVaZZecQW4Ffmh+yN+0JpWkJH8LfGD/Y9PJWLTZmbesdw+dsGONsbY+XrsweueP1RsdPeJ8rX6rlGOo4rDxnTld9T2cdhpU6kkvhRr6bYdMD/P512ljZbCpI9azdNgyFVq7K2gUbSO2a9NJ9TxMRPTQ2tKiZMBRXc6Yh3A+lYGkRbsADPWu1sYtm1sc1ClZ7Hj1ZdWa9sjkAkYrcjVlw1RW6rgKBWisWEB/D8apLTTY8uvUT0L1vKcEYqyjHGPSvP/ABt8TPhv8K9FbxB8StZt9Fsl6zTtnOOuEXMjf8BU1+ZPxG/4K+/BnQNXuNJ+FeiXPiyGBtpvGmFjbSD1j3JJKeP78SV5eOzvD4XSpLU78FkeJxLtTifrfPHuO881+bX7Z/8AwUS8Efs92F98Pfg9fx+I/FU0qRh4V82z03qBPc7co0seTtiVzgk5YcZ/Ij42/t7/ALQXxutLjQbq9ttA0iY5+y6TD9nbB6hpiWlcezMevua+LDCCxkdizv8AeZslm+pr5DN+MVUoyo4Xr1Pscn4K5K8a2KV7dCjrmq6t4h1a41zXbl7u8u5GlmmkO5nduSSSaox96uyRbcAVF5f+f8mvz9c1R80tz9KdFW93Ykoooq7WMnvqWKKKKzNwooooAKKKKACiiigCvRRRQAUUUUAFFFFAH//R/knooor3D5MKKKKDQKKKKACiiigAooooAKKKKACiiigAooooAKKKKBNXCvr/AOEf7D/xx+L8cesWNtDo2kkf8fmqsbcynsYYdrSuhxw7Kmew64+yf+CY37I3hXx/cSftBfFWy/tDTNKuBHpFhLzb3N3EPmmlX+NYHyEQ5QuAzBsAV+1+toUiyRWC5Wz9o4K8KpY6jDH5jVlGEtoLqujv/wAA/nY8Xf8ABOH4z+HNHk1TSNT0rVmhyXhhlkjl2+oEkag/gTXyDYD4rfALxaviDRbu78NeILIlre7iLIyDuRtK7gccqxKHupr+ovW5iQ/y9BXx58avhp4b+K3h6Xw34ih+ZSWt51+/C5/iHrnuO9dEcOpK7PpM78KsJhKTxGTzmqy294+lP2DP2/8Aw1+1JpI8BeNvK03x5YRefPAjfuL6yQfNcQscfvF4MkODtyCGNfoxcQL1HOO9fxQ+FvE/i79mr41WHirS18vU/Dd4coDsWRBw6ZAOFkHytjqjMO9f2SfD34l+H/ib8P8AQfiH4XkEllrunW9/HzkqJgflPuCMdB9BXj46lyS0PsPDbiqvmtCth8bG1ei+WWu/Zvz01ZtXlpuHSuWvbAE/MMfrXeyMso6VkT26v2rKnJn6jCHMjzW5sQBlV/WuS1GwwRgYJNeqXVt6jrX5Gftt/t56N8NRN8LPgVqCX3iuNMX+pwPug0mf/nkvXzLleS3zL5PAOWZlTvpSZ4HEee4DJsFPF46draRj1k+y/wAzkP20P2y7H4WWs/w7+FtyG8SsPLnvozu+wK33hH/03PG1s/u+eDnj8Klh1XxJqyQQK9zdXUgVVGWZnc4H1JJq3rFzfalfyX+oSNNLKxZmY5JJ6k19F/sYeFf+Eu/aQ8P6WJPK+yF9Sdtu7EVliRuM9+B7Zzz0r0oSZ/FnHnGNfMq1bH1FaCT5YJ6RS/V9X+SVj9fPD3ge08M6DbaJYoFt7WJYY0H+yOT+JrQt9H8piWTGO9exXGkMCpCjA7UkmkbmCqmK9WjTutT+T515SfMzyn+xA38NOGjHY0RQFW6g8g17BFoCsgO0fnTzoCr1Uc+9aTWjSKo5i6c1Jbo/mU8b+DdV+H3irV/Bmsf6/TL+a2LY2hxHjawHPUNnqetfqH+yD+1tD4mki+G/xVnA1VgqWuoyNj7VjOFl4/1v+3u+fpgY5+S/28tG/sD9pDUisvmDULS0vHGMYleMI56/xeWDXx+jEnK8EVhl+Kq4DEKrTlZdV3P3WlSjjsDCcd5pM/qlsiHlCKODXbQWIijRwa/Ir9kj9uOFJrb4Z/tB6sBnbHYa1cr36FLqXPGfl2SEBBzuI4J/Z/8AsprchT1Xg5r9fyrOKGYUVUpb9UfAZnga+CquFZadCxpCdDt/WuztE2KpA9aydJt0Xk+9dhbRRbVyfWu5rU+er1LhbuB8pr4//bV/bJ8P/so/D+O4t4oL7xLqYM2nW10m+1iWAjdcz9wkZZQBglieMYNfYd1eaFoumX2veJrsWOn6fbyXM85G7YkSljhcjJwOB1NfyLfF74g+MP2lPjHfeNViNzf63eCKygLH93Zo2y3jyf7iYBPc847V87xFmdWhSWGw7tOex6XD2WUsTV9tXjzQW67mF4p+Ivxs/aU8Zpe+OLm88Sa/e7vL8tMRxg87Iol2xwxA/dVFGM854x674U/YM+M2uWC6ot9pFvLJz5ElxIzAe5SJgD7Zr7s+Bnwq074U+Hns7TM9zfFZrq5l5muJgDl2Ppz8oxxzzzX1p4cjYgMeK8nBcNQrRvi3eb3Z9nXzeeHf+zKyPxb8ZfscfG7wLpX9qSWK61EM7xpBN28YHdo8JJg8/cRuhzjjPzJMhAKtwRX9UuiFotsZXivzS/4KKfs06ZYeFJf2i/Blvi6hlX+3I412rJE//L1gdHUjEhxh9wPy7eeHPeE44Wg62FV+5tlHFPtq6oYp2ufjvL/rDUdOZtzbqCMNivgHJwdmfZTqroNooop3vqLzLFFFFBYUUUUAFFFFABRRRQAUUUUAV6KKKACiiigD/9L+SeiiivcPkwooooNCxRRRQAUUUUAFFFFAFeiiigAooooAKKKKACiilAJOBUzjzKw07O5/YF+yP4V0Lw5+zD4Ct9NiEZk8P2DSP3cvGJM/XLnPrXqHiax3Rllr4b/4Js/GtfiV+z7ZeBtRlP8Aa/g1RYXEXZLdndrYg9/3fyfVM55wPvjWImkj461xc7pyR/dPDGMw+PyfCVaD/wCXcPwVvzTPANeg2h8DtXiGsW4EpIHevorxCiHfj0rxHxAqRWst4BkKa9WhXXLexnmD5NXoj8I/25NC07S/jit7Zp5ct5pNmZfcqZAD+tf0Gf8ABNeT+0f2MfB/GPsQu7KP2hguJAg/DJr+Zb9oDx/c/Ez4nXniZZPPs9iQ2cw4EsEedrBedoOemT9a/qZ/4J7+CbrwB+yD4L0bUJvNu7yzbU5Y9u3yhfO0qp1OcA4zxn0Fedj7TZ+J+GmKpVuLcdPDu8Pe17+9E+wVXbQyFxxzjrVwqR1r85P+Ch37Y6/syeCLXwv4JuTH408TxvFZuvIs7YkK903H3kP+pPGHG7+HB4YQd7I/f84zujlOCqY7EO0Y/j5LzZ8tf8FFP26x4cW4+AvwTv8AbrZ3Raxew8/Y0bA8lGz/AK487wAfL4BO/cq/hDFEsK7VySSSSTksT1JPcnuazY9QkkneW5YvLKxaR2O5mY9ST3JPer6Tq67q9DD0r6n8UcU8T47PcdPGYuen2Y9IrokJJHnHNfpf/wAEufBk+r/EjxJ4yjlAt9JsI7eRcZJa7Yle/pEe3evzXBB6V+/3/BLn4UzeFP2aJPFM0PlXfie8aUvndvgtf3MTD/eIdvbOOetehT91n5dxbj/q2BfMviaj959gf2FbHku3/fNA0K2ByHI/4DXrQ06UKB0P4Uf2fN1zz+Femqvu6H4I8Rds8mOk2eMGY/8AfH/16T+x7L/nsf8Avj/7KvXhpt0RkSnH0z/UUv8AZl3/AM9T/wB8/wD16q4cyZ+D/wDwVU8K2VlqHgXxLCoF1La3dhJgclYJBKvOTn/XN9K/JePvX9In/BSn4Z6z4s/ZhvtY0CESXfhy6h1QhfvCAZgkYdfu+cGIxyBjjrX82ad68zF32R+6cC5l9YyyNOSs4NovXMeQDX7IfsB/tr/bNY0/4AfGC8MVpOfI0fUJW3bJm+5byE4+V8bY2zw+Fwd2V/G2mqu2unJ8dVwdZVKcrLqj6TOcFSxdB06kbvoz+zyKMxkECteGV1Xbngf1r80P+CfH7WMnxq8MN8PvifqCv4o0tgBcPw93ZIP9Y5P3pV6M38WRnGOf06tY/KlDDkGv2LLMzpY6iqtJ69T8Wx2DrYWvKlVjZdGfNf7bWvS+Gv2PfiFrCwGb/iW+Ttzji5cQsc4PRJG475r+a39l2E6v8ZdPY8eVDcn84X/wr+oH9r7wjqXxB/ZM+IPg7QohJeXWjTPGvqbcif17+Xt9s5r+U34ReM7b4e/EHTddnTKwXKifBxm3cNHIOh/vBun8NfJ8UUeXN8NWW0VFn1vAjTyzEQlu5n7qaJZi4giP+yK9n8O2AUhhxjNeQeGrq0uYobuwO63mCyxsOhjcAqfyIr3bR8sEROMd6+7pyhNc8epwZjVdJ2Z3FjBuZVVcGrHxM8Jaf4m+EfinQNbjE1ne6NexSoe6iJnPf/YrW0W3ESrJJz1r5l/bs+OEXwf/AGcdYstPkMeteI1/s3TyP4TJkSsfYRFh9WFcubSX1SbkeNgHKrjYQgtT+a2jOBgUlFfgmKUpVHJn7lSw6jCKCiiiiOxpJ9CxRRRVAFFFFAFeiiigCxRRRQAUUUUAV6KKKACiiigD/9P+SeiiivcPkwooooNAooooAsUUUUAFFFFAFeiiigAooooAKKKKACpIyA4JqOigTV1Y9v8Ag58a/GvwQ8aW3jzwVdNDcwECRCcxzR90cdwf0r9v/hj/AMFUvgb4w0Mj4hW914d1CPar5je5tST1JljXKj2K96/ngiG4MpqO3iAz7VhVpczPtOGePs1yTljh5KUI/Zkrr57P7mj+jrxV+3n+ypZBXPilbsOCfLtLaeaY/wC6nlrn86/Jr9pT9szU/jXZ/wDCL+ErK40fRw7+Y0rgTXSHGAygZjGQdwySfbv8UzwZximmDAzmqjdKx6PEPihnea0fYTlGEOqjfX729jp/CfhPWfiF4w0XwRoK77zWNQtbCIddv2iQRlsZGdu7OO9f3OaTodhoFhaaPp8Sxx2NrDa4Xp+5GBj2GTX8iX/BO/w9/wAJH+2l8Pv33k/YdRa/Py7t/wBkikmVeoxl0Q556dK/sCOa4cY2fp/gTlyngcTjb/FKKt6K9/nzfgcX428UaD4B8Jaj438SzC203SreW6uZW/hjiUsx9zgHA71/Fh+0b8b9d/aH+MGp/E7WwYkuCILK2Lbxa2UWRFCG74yWY4G52ZsDOK/oJ/4LGfGjUvAnwE0z4SaSzQt46uJY7lx/FY2YQzR+n7wyJ+VfzDqmWBzW2Dh1Z8/408T/AFmvRyjDS9yFpT/x9F8lr8/I0YyVA28VMkzJUCfdp1eglbY/Cp1bbna+CvD+uePPGemeBdAi82+1idbW2X+9PIQEX2B5ye1f2K/DTwFZfD34f6L4F00D7No1jDZR4GAfKBy2D/eJzX4X/wDBKj9nW78VfFA/tBa9b7rDw35kOmluh1FgpEg7/uUbcvbeVP8ADg/0SyRJKPTFdNGkpas/F/EHNqOIrU6NF35L3+djmjZoe1ILJB0Fbb2LFvlFR/YWrps1ofm7Rii0jFOFsg6VsrECcEVIbcdAKGmQ6ri7HCeK/D2n+JvCureE9RjD2+sWU1jNkZHlzDDZGRn6Zr+OH4g/DXXfhl471zwD4kXbd6Lfz2THGA/lEYYezA57/Wv7TZ7ctg7f1r8K/wDgrV8CDa+LdN/aI0GLEGpwRaZqSqPuz2oIhcn/AKaRYjHH30UZ+fjmrRfU/ReAs2pYfGfVart7XZ+a6fO+5+JjLtOKbStyxpK5Voz9wrxtY9O+EXxL1n4QePdL+I/hkY1HR7uK5hYNtDouVlhfg5jmjZkccdj2wf64Php430j4j+DdP8beGz5tlqMKTxHOSFcZ2n3HQ1/GxF91q/fD/gj58X49V8CeI/gd4gmzdaJJ/aen7v8AlpBck+coHbZL8/fPmY4xz9lwjj1RrSoNfHb8LnwnGGXutRVdP4L/AI2/yP2HtG8vIlQPG6sjoejK3BB9iK/iu+L/AIE1j4X/ABU8Q/DnxAu270S/ntH4xnY3Bxk4yO2a/tXXI/h5r+W//gp74WfRf22PFGyTzDqltYapJxjE11F8/fn7or2+M8NKnSjiL6tpHicCV4upVw1rprm+7/hzhf2df2udb+EEI8MeK4ZNW0F2BaIPskTHTaxBGBk8H1r9Q/Av7Z/7PGp6QmsXesnSFPAhv7eZXB9MwpPGcezmv5+xHhgelapm8yHZXyuX8W43C0fYpRl6q59tjuH8FWtfmT8nY/ejxn/wUV+CHhayiXwmtz4gu3JA8mKW3tsDv500a5+ioelfjd8bfjF41+OfjSfxl4zuMliRb2cPy2lrH/dij7e7MS7fxMcDHjDR7ZatLhQBXDmXEWNxdrtRS7K1/U6Mr4fw2C53SbfNbd32K9FFFeO7v4j15ztoFFFFMgsUUUUGgUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB//U/knooor3D5MKKKKDQsUUUUAFFFFABRRRQBXooooAKKKKACiiigCxRRRQAUUUUARydqjqSTtUdAWvofeH/BNy/wD7O/bT8DKwz9puJ7SP3muYZIol/wCBO4H41/X49uU6jNfwleDvEOq+EPENn4m0OVobqxlSaJ14IdDkHv3Ff2ffs3/tCeGv2mfhTY/FbwtEbaK5JhubV33y2l3HjzYJMAfMuVYHHzIytxnA4a8W5I/ovwMz2hQoV8qn8fxrzSSUvusvvP50v+CxXjbV/EP7Ww8J3BBs/Dmj2lrGuc7Zpt08o/DzEXv0r8qCCOtfdn/BRMLcfttfEljzjVhj8beGviB41BCg8120YpRPxfjO/wDbeM/6+T/9KY2PvXr/AMDvgz4x+P8A8SbD4YeBot15e7neZ+IbeFMb5ZW/hRcjJ/AZYqpqfB34JfE748+NbbwD8KtMbVNQuWUFR8qRIeru3IVQOpr+qv8AY3/ZO8Lfsp/Dt9EsW+269q3lTaxqLDDXE0Ybaqj+GGPcwjTnbk8nNdEItvQ/NOIuIcPlmH55e9OV7K+/c9v+DPwe8HfA/wCGGkfDbwRb/ZrHT4/lXPzSM3MksnrLJIWZjxkEDHGT6V5f+f8AJq6c7d2OlfJH7Un7Yvw1/ZL0x4/H/mSa/cEtp+jp8lzLGMYkk4byowSNzYbGehrWOiPwPBYXFZrifZ4ePNN/1ufVRTjivj/xv+3f+yd8PNYbQfE/jvSRdx53xWzzXZX6tBC6fkxr+a748ftifHb9p3UbmHx9qptdEmKtDpOm5gtkI6s4LN5ztxlpd3Tjbk542y/Zw+K/iBmFxZR2O0AiO4k2z/8AAk2jb+da83c+7p8EYekuTNK/s59r2P6fvAv7dv7JXxF1oeHfDnjrTlvHGUS882z8z2QzRoGI7gdMj1FfWNtcQXUC3Nq6yxOMq8bBlYexHWv42rn9mX4u6XYvf2Ngt8kf3xC+Sv4CtH4LftEfHn9mTVfI8Ialc2sMLfPpV2TLpzr3Bt26HrhlYOM/KwyaiVZwkOXh/h8TpleI55rpe9/8j+xZ4g55rz74nfDXQ/i58PNU+GXigBtM1mPybpcbiU/vLngSIcNG+DscBsHGK+e/2QP2xvAP7UfhfyLR00/xPYp/p+l7xIEI/iikwPMX1BVXUY3KMivs+M9RTnP2itY+CzOhicsxDo14WqR/M/jV/aZ/Zz8cfswfFS7+GXjcCRlAuLO7jGI7q1kzskXrg8FXXJ2OCuTjJ+fa/sf/AGpv2W/Af7VXgL/hFvFbGz1OzLy6Zqka75bSV8bsrld8UmAJIyRuwCCrqrL/ACn/AB8/Z5+K37NPj2f4e/FfTjZ3cZYw3EZ8y1uoweJIJcDcpyMghXXOGUZGeeVLlP3PhHiaGaYFQqSviI7o8Xh6H8K+4/8AgnT411Pwj+154Z07TmEa+IFutLnY8jy5omYfj5iofwr4biPUV9L/ALHLSR/tWfDt4jhjr1qoI64bIP6Vvl1d0sbRa2vc93NcNzYGu5r7J/YJPaIDnH61/LF/wVB8Qpq/7bHiYLHtOm2mn6bJzn99bQ/OPw3Cv6Xvi18U/D/wc8B6l8QvFGEsdNt5JSS20ySgYihTg5kmkKog9yecYP8AF9488a638SviBr3xG8Quz3ev6hPfybzlg0xyQT3NfecY49VKEaPW6Z+e8A4JrEVqzeiVvW/+Vjn2JY5NAJAI9aSivzGR+q8lrBRRRSWxqtixRRRWpm0nuFFFFA0gooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/knooor3D5MKKKKDQsUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBZjc+WQOCB1r6B/Zc/ax+L37Jnjg+J/h9cifTrwBNS0i4ybS9Rfu71zw6ZOxuoyetfPsHeq81uBjnrScUzpwOOr4OvHE4aXLNbM/RT4lS6J/wAFC/jhN49+Adlb+HNSv9PsW1LTdVughkvVjKSPDKF/e/Ki7wyxuvGUGRn6m+GH/BHLxBcGDVvjV40g01FzvsdHhM1yT/12nRAn4Kf8fxE0nWdd8M65ba74fuGs7m2belxCdk6Hg/I/OM45r9Ufhd/wWJ/aF8HaSnh/4g6JpPi+2iBCT3Hm2t4fTdJCwiOD6QjNB8pxjVz7H4uWLwUr82rXn1d9tf0P3/8Agz8HfhH8BvCaeCvhBo40qyXBcl/NllYcAySN+8YjtuYgdsZNevq26v56dQ/4LR+LztudA+Htja3cefLmmv5ZQmfRUji/U18dfGD/AIKCftQ/HbzrDxN4hk0nSbrm407R82kEpH3dxJeRguTgM7YyfWuqnVVNbH5dQ4FzWrOTxSUf8Ur3vvazb+8/Zf8Aa6/4KXeDvg/Z6n8P/g2YvEvilVKedaSLPZ2bN90yOuQ8g5yke/bjk8jP84HxE+Jfjf4ueNtR+IPxD1CTUtU1OQvLLJn1OAoP3VGcBFwi9lGTnjZYgr/us4OQPpVnQtMbWdas9I8zyzeXEMG/G7b5rqmcZGcbs4yKhYjmdj9GyvJ6WU4e1GN5dz9Mf2Uf2c5tD8OW/wATPFaCLU7sB7WDHzWyDOdx9XyOMDGPfj7Bj0V2YxOuBnNfQWm+EHhtUGBsI+VBxtFWI/B3lthVxnv1/rXpU8OpK9z8uz7MatfFylWdzweHw/IjDaOtfO/7Sf7Olz8Q/C7634cRE1HS4J7naF5mVAPkJz19Cc4/Gv0NTwwkONydfete38PNBiSJeTkU54aKVziwGdV8JiY1KLsup/LZoOt614Z1KLxJ4TvJdP1W0fdb3cLFWib1GCDniv6Gf2OP+Cm3hb4h6fH4F/aCaPw/rNrEiRapI4+x3jcgh2IHkOccDiH/AK5/xfhF8QtF0XQPHuu6Lokfl21rqN3CiZ+6IpWTj2+WvOLy1VsbRXnuuk7WP2TNeHaWa0OSvpLuf3Q2dxBeW63Nq4eOQAqynIIPSuC+J3wj+Gvxm8FXfgj4m6Pb6rZXWADMgMkOc5eGTG+OTph0YYxyDxj+Tv4BftsftG/s4TpD8P8AWY59MBBbTtRjNzB/wAh0eLOTny2XPfOBX6FWX/Banx0bJU1zwFp09zjDyQXk0St/wGRZiP8AvqqcrrU/OcTwJm2DlF4RKb8mtLbXvYs/Fb/gj9LZtcan8G/FsDLkmPTtWVkfHGAs0Yfd3zuQV8paJ8O5v2Av2gvCnjP44Q22v3Fsr6lZ6XpV0jXYJjZIpJVk2BFJckAF3bBwpwa9N+In/BX39ojxLpg0TwLpul+GbUZwY1kuplz02mVjGO+cxnPt3/K/xF4j8SeMvEl/4w8ZXsuqarqMplnvLht00noGbuB2GOKz5+SSmt0fccO5fnKVWnnMrwlGyXr5n1V+1B+2d8WP2pNYWXxOsGl6Rbf8emm2akJFnqXkbMkrn1c8dgMmvkLy/wDP+TUpJJye9JVYnMq2MqyrYiV5M+qwOXYXB0o0MNC0UFFFFcb3OypsgooorIRYoooroAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//W/knooor3D5MsUUUUGgUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFeiiigCxRRRQA1lDdab5a1JRQFyoI1qRSU+7SUUAODc7qaw3df8AOOaKKVP4rmE6akuVn9UXwF8X6H8YfhNo3xK0P/U30AWWInJguIx+9iJ4yUJHOBn0r1qLRsuARgdj/k1/NZ+y9+1V4w/Zr8RyXOnob/SLwj7XYtIUVsfxq38LD3BQ/wAStxj91vA37fX7JPxH0Qax/wAJbZaBcLgS2uqkwMjN2VkDxuOOdjHHevUp1fdsz8N4m4dx9HGyqU6TlCWzSufQVz4cU7dq1y3xH8QaL8Jfh9qfxF8Q4FppkDSEE43yEHykB5x5j7Vzg4znB6V5P8Qv25P2WPBXh9tYtPGFnrtznENrpIlupGI9SseEGccn8Olfi5+19+2R4p/af1yC0itW0zw5YhhbWkrb5nL4zJK4C75BghSVG3JwOc06ta8bHNkfCeOxuISqU5Qgt5Nfkup8Y3Ekl1q1/wCIbli95qlxLd3T/wB+aaRnZvb72PwppZnAzzik2gJxRH3rxpv3z9+tzJLsU6KKK6U9AStKwUgAFLRUXNW9C+Bgk0jLup1FZLQQUUUUAITgZqJm3UM26pQuK1hC4EFFPcAdKZV2sAUUUVmAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/X/knooor3D5MsUUUUGgUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFKTmkoquZgV6XJxikopczAvgYpaKKyElbYr0UUVoMKKKKACiiigAooooAKeHwMUyitFoAUoUnmlUZOKQnNY1KlgJVXbTqYhJ60+pTvqBXooorQAooooAKKKKACiiigAooooAKKKKACiiigD//0P5J6KKK9w+TLFFFFBoFFFFABRRRQBXooooAKKKKACiiigCxRRRQAUUUUAV6KKKALFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAV6KKKALFFFFABRRRQAUUUUATKu2kKZOafRWb13AKKKKAK9FFFaAFFFFAFeiiigAooooAsUUUUAV6KKKALFFFFAH/9H+SeiiivcPkyxRRRQaBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAV6KKKALFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBXooooAKKKKACiiigAooooAsUUUUAV6KKKALFFFFAH//0v5J6KKK9w+TLFFFFBoFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9P+SeiiivcPkyxRRRQaBRRRQAUUUUAV6KKKACiiigCxRRRQAUUUUAFFFFABRRRQBXooooAsUUUUAFFFFABRRRQAUUUUAV6KKKALFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAV6KKKALFFFFABRRRQBXooooA/9T+SeiiivcPkyxRRRQaBRRRQAUUUUAV6KKKACiiigAooooAsUUUUAFFFFABRRRQBXooooAsUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBXooooAsUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAV6KKKACiiigCxRRRQAUUUUAf/9X+SeiiivcPkyxRRRQaBRRRQAUUUUAV6KKKACiiigAooooAsUUUUAFFFFABRRRQAUUUUAFFFFAFeiiigCxRRRQAUUUUAFFFFAFeiiigAooooAsUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFeiiigAooooAsUUUUAf/9b+SeiiivcPkyxRRRQaBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//Z';

/* ─────────────────────────────────────────────
   TICKER
───────────────────────────────────────────── */
function TickerStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="w-full h-[22px] overflow-hidden flex items-center relative">
      {/* edge fades */}
      <div className="absolute left-0 inset-y-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-[#06010F] to-transparent" />
      <div className="absolute right-0 inset-y-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-[#06010F] to-transparent" />
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((name, i) => (
          <span key={i} className="inline-flex items-center gap-2 font-sans text-[8.5px] tracking-[0.20em] uppercase text-white/[0.18]">
            <span className="w-[2.5px] h-[2.5px] rounded-full bg-purple-400/30 shrink-0" />
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MORE DROPDOWN
───────────────────────────────────────────── */
function MoreMenu({
  active,
  scrolled,
  onNav,
}: {
  active: string;
  scrolled: boolean;
  onNav: (to: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isChildActive = MORE_LINKS.some(l => l.to === active);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const textActive = scrolled ? 'text-neutral-800' : 'text-white';
  const textIdle   = scrolled ? 'text-neutral-400 hover:text-neutral-800' : 'text-white/38 hover:text-white/80';

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`
          flex items-center gap-1 px-3.5 py-1 rounded-lg
          font-sans text-[12.5px] tracking-[0.015em] font-normal
          border-0 bg-transparent cursor-pointer transition-colors duration-200
          ${isChildActive ? textActive : textIdle}
        `}
      >
        More
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2, ease: 'easeInOut' }}>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-48 z-50 origin-top"
          >
            {/* arrow */}
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#0D0618] border-t border-l border-white/[0.09]" />
            <div className="overflow-hidden rounded-xl bg-[#0D0618]/98 border border-white/[0.09] shadow-[0_20px_56px_rgba(0,0,0,0.70)] backdrop-blur-2xl">
              {MORE_LINKS.map((item, i) => (
                <HashLink
                  key={item.to}
                  to={item.to}
                  onClick={() => { onNav(item.to); setOpen(false); }}
                  className={`
                    group flex items-center gap-3 px-4 py-2
                    font-sans text-[12.5px] tracking-[0.01em]
                    transition-all duration-150
                    ${i < MORE_LINKS.length - 1 ? 'border-b border-white/[0.05]' : ''}
                    ${active === item.to
                      ? 'text-white bg-purple-500/[0.12]'
                      : 'text-white/45 hover:text-white hover:bg-white/[0.05]'}
                  `}
                >
                  {active === item.to && (
                    <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                  )}
                  {item.label}
                </HashLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE DRAWER
───────────────────────────────────────────── */
function MobileDrawer({
  open,
  active,
  onNav,
}: {
  open: boolean;
  active: string;
  onNav: (to: string) => void;
}) {
  const all = [...NAV_LINKS, ...MORE_LINKS];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{ opacity: 0, y: -8, scale: 0.98    }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[calc(100%+10px)] left-0 right-0 z-50"
        >
          <div className="mx-1 rounded-2xl overflow-hidden bg-[#09040F]/97 border border-white/[0.08] backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.75)]">
            <nav className="p-2 flex flex-col">
              {all.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0  }}
                  transition={{ delay: i * 0.045, duration: 0.24 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => onNav(item.to)}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl
                      font-sans text-[13px] tracking-[0.01em] transition-all duration-150
                      ${active === item.to
                        ? 'text-white bg-white/[0.07] border border-white/[0.07]'
                        : 'text-white/38 hover:text-white/75 hover:bg-white/[0.04] border border-transparent'}
                    `}
                  >
                    {item.label}
                    {active === item.to && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mx-3 h-px bg-white/[0.06]" />
            <div className="p-3">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.26 }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 font-sans font-semibold text-[13px] tracking-[0.04em] text-white border-0 cursor-pointer shadow-[0_4px_20px_rgba(109,40,217,0.45)]"
              >
                Book Session Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
export function Navbar() {
  const location                = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState(location?.pathname ?? '/');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const handleNav = (to: string) => { setActive(to); setMenuOpen(false); };

  /* ── computed tokens ── */
  const pillBg     = scrolled ? 'bg-white/[0.9]'    : 'bg-black/[0.7]';
  const pillBorder = scrolled ? '' : 'border-white/[0.10]';
  const pillShadow = scrolled
    ? 'shadow-[0_4px_32px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.8)_inset]'
    : 'shadow-[0_4px_32px_rgba(0,0,0,0.40),0_1px_0_rgba(255,255,255,0.06)_inset]';

  const logoText  = scrolled ? 'text-black' : 'text-white/95';
  const logoSub   = scrolled ? 'text-black/70' : 'text-white/70';
  const sepColor  = scrolled ? 'bg-black/[0.09]'  : 'bg-white/[0.08]';

  const linkActive = scrolled ? 'text-black/70' : 'text-white';
  const linkIdle   = scrolled
    ? 'text-black/60 hover:text-black/80'
    : 'text-white/38 hover:text-white/80';

  const activePill = scrolled
    ? 'bg-black/[0.06] border border-black/[0.08]'
    : 'bg-white/[0.10] border border-white/[0.10]';

  const burgerColor = scrolled
    ? 'text-neutral-500 hover:text-neutral-800 border-black/[0.10] hover:border-black/[0.20]'
    : 'text-white/40 hover:text-white/80 border-white/[0.10] hover:border-white/[0.22]';

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ticker 
       <TickerStrip />
       */}
     

      {/* Pill wrapper — animates scale on mount */}
      <div className="flex justify-center px-4 pt-4">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1,    opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[630px]"
        >
          <div
            className={`
              relative flex items-center  px-2.5  py-2
              rounded-full border
              transition-all duration-500 ease-in-out
              ${pillBg} ${pillBorder} ${pillShadow}
              backdrop-blur-2xl
              justify-center lg:justify-start
            `}
          >
            {/* ── Logo ── */}
            <Link
              to="/"
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 group shrink-0 pl-1.5 pr-4"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-[28px] h-[28px] rounded-[9px] overflow-hidden shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.25)]"
              >
                <img
                  src="assets/logo.png"
                  alt="NTA"
                  className="w-full h-full object-cover scale-[1.08]"
                />
              </motion.div>
              <div className="leading-none">
                <p className={`font-serif text-[13.5px] leading-none tracking-[0.01em] transition-colors duration-500 ${logoText}`}>
                  NTA
                </p>
                <p className={`font-sans text-[7px] tracking-[0.24em] uppercase mt-[3px] transition-colors duration-500 ${logoSub}`}>
                  Trading Academy
                </p>
              </div>
            </Link>

            {/* Separator */}
            <div className={`hidden lg:block w-px h-3.5 shrink-0 transition-colors duration-500 ${sepColor}`} />

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center flex-1 px-1.5">
              {NAV_LINKS.map((item) => {
                const isActive = active === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => handleNav(item.to)}
                    className="relative px-3.5 py-1.5 rounded-lg group shrink-0"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className={`absolute inset-0 rounded-lg ${activePill}`}
                        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                      />
                    )}
                    <span className={`
                      relative font-sans text-[12.5px] tracking-[0.015em] font-normal
                      transition-colors duration-200 whitespace-nowrap
                      ${isActive ? linkActive : linkIdle}
                    `}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              <MoreMenu active={active} scrolled={scrolled} onNav={handleNav} />
            </nav>

            {/* ── CTA ── */}
            <div className="hidden lg:block shrink-0 ml-auto pr-0.5">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className="
                  relative overflow-hidden
                  px-6 py-3 rounded-full
                  font-sans font-semibold text-[12.5px] tracking-[0.04em] text-white
                  border-0 cursor-pointer
                  bg-gradient-to-br from-violet-600 via-purple-600 to-purple-500
                  shadow-[0_2px_16px_rgba(109,40,217,0.50),inset_0_1px_0_rgba(255,255,255,0.18)]
                  hover:shadow-[0_4px_24px_rgba(109,40,217,0.65),inset_0_1px_0_rgba(255,255,255,0.22)]
                  transition-shadow duration-300
                "
              >
                {/* gloss */}
                <span className="absolute inset-x-0 top-0 h-[80%] bg-gradient-to-b from-white/[0.15] to-transparent rounded-full pointer-events-none" />
                <span className="relative">Get Started</span>
              </motion.button>
            </div>

            {/* ── Burger ── */}
            <div className="flex lg:hidden items-center ml-auto pr-0.5">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setMenuOpen(v => !v)}
                className={`
                  w-9 h-9 flex items-center justify-center
                  rounded-full border transition-all duration-300
                  ${burgerColor}
                `}
              >
                <AnimatePresence mode="wait">
                  {menuOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.14 }}>
                        <X className="w-[14px] h-[14px]" />
                      </motion.div>
                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.14 }}>
                        <Menu className="w-[14px] h-[14px]" />
                      </motion.div>
                  }
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile drawer */}
            <MobileDrawer open={menuOpen} active={active} onNav={handleNav} />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
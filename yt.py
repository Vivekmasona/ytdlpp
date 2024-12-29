import sys
from yt_dlp import YoutubeDL

def get_audio_stream(url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'quiet': True,
        'noplaylist': True,
    }
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        audio_url = info['url']
        print(audio_url)

if __name__ == "__main__":
    video_url = sys.argv[1]
    get_audio_stream(video_url)

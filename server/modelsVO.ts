/**
 * Created by админ on 24.03.2017.
 */

class Content{
    content_id: string;
    version_id: number;
    content_name: string;
    thumb_file_id: string;
    thumb_file_name: string; // B-EmployeeWeather - Editable.LFD.PNG
}

class VOPlaylist{
    playlist_id: string;
    version_id: number;
    playlist_name: string;
    thumb_file_id: string; // AC0B5F54-C2C0-4B90-A35D-335A4D2859BE
    thumb_file_path: string; // C:\MagicInfo Premium\runtime\upload\contents_home\AC0B5F54-C2C0-4B90-A35D-335A4D2859BE
    thumb_file_name: string;
    device_type: string;
    content_count: number;
}

class VOPlaylists{
    totalCount: number;
    playlists: VOPlaylist[];
}
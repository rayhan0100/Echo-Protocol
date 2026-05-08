// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EchoStream {
    struct Track {
        string ipfsHash;
        string title;
        address payable artist;
        uint256 totalTips;
    }

    Track[] public tracks;

    function uploadTrack(string memory _hash, string memory _title) external {
        tracks.push(Track(_hash, _title, payable(msg.sender), 0));
    }

    function tipArtist(uint256 _trackId) external payable {
        require(msg.value > 0, "Tip must be > 0");
        Track storage track = tracks[_trackId];
        track.artist.transfer(msg.value);
        track.totalTips += msg.value;
    }

    function getTrackCount() external view returns (uint256) {
        return tracks.length;
    }
}

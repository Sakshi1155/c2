// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MarketingSystem {
    struct Campaign {
        address creator;
        string title;
        string description;
        uint256 budget; // in wei
        uint256 startTime;
        uint256 endTime;
        bool active;
    }

    Campaign[] public campaigns;

    // Function to create a new marketing campaign
    function createCampaign(
        string memory title,
        string memory description,
        uint256 budget,
        uint256 startTime,
        uint256 endTime
    ) public {
        require(startTime < endTime, "Invalid campaign duration");
        campaigns.push(Campaign({
            creator: msg.sender,
            title: title,
            description: description,
            budget: budget,
            startTime: startTime,
            endTime: endTime,
            active: true
        }));
    }

    // Function to get all active campaigns
    function getActiveCampaigns() public view returns (Campaign[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].active) {
                count++;
            }
        }
        
        Campaign[] memory activeCampaigns = new Campaign[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].active) {
                activeCampaigns[index] = campaigns[i];
                index++;
            }
        }
        
        return activeCampaigns;
    }

    // Function to deactivate a campaign
    function deactivateCampaign(uint256 campaignIndex) public {
        require(campaignIndex < campaigns.length, "Invalid campaign index");
        require(campaigns[campaignIndex].creator == msg.sender, "Only campaign creator can deactivate");

        campaigns[campaignIndex].active = false;
    }
}

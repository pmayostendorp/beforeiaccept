var rp_response = 
    { "valuation": { "pmp": { "seat_ids": [ 1524 ] }, "ads": [ { "type": "partner", "cpm": 0.000970, "dcpm": 0.000970, "fcc": 0, "fcl": 1, "fcp": 86400, "pacing": 0.200000, "ad_id": 3673978 }, { "type": "partner", "cpm": 0.680110, "dcpm": 0.680110, "fcc": 0, "fcl": 3, "fcp": 86400, "pacing": 0.200000, "ad_id": 3681734 }, { "type": "partner", "cpm": 0.712500, "dcpm": 0.712500, "fcc": 0, "fcl": 1, "fcp": 86400, "ad_id": 3821980 }, { "type": "partner", "cpm": 0.750000, "dcpm": 0.750000, "ad_id": 3821984 } ], "cpm_cnt": 4, "invalid_cpm_cnt": 0, "bid_cnt": 0, "invalid_bid_cnt": 0 }, "context": { "site_session_count": "0", "country": "us" } };

var rp_valuation = rp_response.valuation;
try { oz_onValuationLoaded_168654_15(rp_response); } catch (ignore) {}

/*
Data Center: IAD1
pid: 24240
BE Status: O
BEms: 1
AEms: 4
Alg: PT
Session Count: 1
Continent: na
Country: us
*/

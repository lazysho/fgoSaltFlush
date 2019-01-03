# fgoSaltFlush 0.0.1
### Too salty?
**F/GO not giving you your waifu or husbando?** Try fgoSaltFlush and flush your salt away, though not guaranteed. ~~Your salt level could be too high just like mine that no amount of fake rolls could quench it.~~ Anyway, you can use salt flush for warm up rolls, good luck charm, or if you're itching to roll but you're saving for a servant you'll never get if you're f2p.

fgoSaltFlush aims to mimic the summoning system of Chaldea by adding animations in the summon process, making it look and feel a little bit the same as the original. Its goal is to make me happy because I'm so done with my rolls.

Please note that fgoSaltFlush is currently on its **alpha stage**. Also, this follows after **F/GO NA**.

### Disclaimer
I do not own Fate/Grand Order, commonly known as F/GO, or any of the assets (images or sound) used here in salt flush. F/GO belongs to [Type-Moon](http://typemoon.com/), [Aniplex](http://aniplexusa.com/), and [Delight Works Inc.](https://www.delightworks.co.jp/). I just own the program, the codes.  
  
For the animations, everything was easy thanks to [Animate.css](https://daneden.github.io/animate.css/). Then I got the assets [here](https://www.reddit.com/r/grandorder/comments/7di9d0/so_newer_fgo_assetsbgcgui_were_ripped_from_the/) and from [F/GO Cirnopedia](https://fate-go.cirnopedia.org/).

### Summoning System
Since fgosSaltFlush is still on alpha stage, and *I did this for fun*, I only used basic math ~~(no probabilities or whatsoever)~~ and did it the way I imagined the summoning would be. That means **summoning is not accurate**, **not close to how F/GO does its summoning**, and **can't be used for studying probability of rolls** for now. I will improve the summoning some time later, so I can use it for predicting my rolls. For now I'll just explain what I did with this flush thing.

#### Rarity
   | Rarity | Servant | Craft Essence |
   |--------|---------|---------------|
   | 5 Star | 1%      | 4%            |
   | 4 Star | 3%      | 12%           |
   | 1 Star | 40%     | 40%           |

Of course, I used the rates of summoning that F/GO provided. From what I understood, you have a **44% chance of summoning a servant** and **56% chance for craft essence**. I didn't include the **drop rates of each servant** in the calculation because I'm not really sure (???) how and where to include those rates in the program I made. I'll just figure that out later.

#### Process
Now, here's how fgoSaltFlush plans to flush your salt.
1. First thing I did when I got the banner is **split the pool** into two types, **servant** and **craft essence**.
2. We all know that if you roll for 10x, you'll have a guaranteed 4* above card. Before finding out what's the card type and rarity, **determine first the position of the guaranteed card** if rolling for 10x. This is where the system starts to rely on **RNG** or **random number generation**. 0-9 will be the range, the result will be the place of the guaranteed card.
3. **RNG again for finding out the card's type and rarity**. I decided to **get the type first**, so the range is from 1-100. If the number generated is from **1-44** (44%), the card is a servant otherwise **45-100** its a craft essence (56%). Do **another RNG for rarity** and see the table below to find out the equivalent rarity of numbers.

   | Rarity | Servant | Craft Essence |
   |--------|---------|---------------|
   | 5 Star | 1       | 1-4           |
   | 4 Star | 2-4     | 5-16          |
   | 1 Star | 5-40    | 17-56         |
   
4. The **entire process of in step three is in a loop** by the way, which calls `rollCard(guaranty)` for the number of rolls you chose. When the counter reaches the position of the guranteed card, the variable `guaranty` a boolean is set to true. When picking the rarity, this boolean is used to **shorten the range of the pool to 1-4 for servants and 1-16 for ce**.
5. **Next step is to pick the specific card, the spirit orgi**n. The **rarity** (actual number from RNG) and **pool** (servant/) is passed to a function `rollSpiritOrigin(rarity, pool)` which when number of stars is determined (5*/4*/3*), groups the cards with same rarity. From there, **do another RNG using the range of the split pool to pick the card**.

If you know something that I dont, or if there's something wrong with what I did, please feel free to tell me by giving an issue!

### Features
#### Banner
You can choose a banner to roll from. For now I only made two banners, **Classic** and **With Limited Servants**.
1. **Classic** - Equivalent of Story Summon
2. **With Limited Servants** - pretty self-explanatory, though I also included the welfare servants in the pool

#### Yolo or 10x
Like the summoning system in Chaldea, you can choose how many times you would like to summon and cry.

#### Animations
*fgoSaltFlush doesn't just show you what your RNG luck dictates in a form of list or table*.  
It animates the summoning, just like the original summoning system in F/GO. I tried my best to make it feel more similar by using flip and fade animations, showing the class card first then the card itself.

#### Random Background
I inserted a miscellaneous function that gives random backgrounds upon load. There are 8 backgrounds in the bgpool.

#### Responsive
System, or website, adapts base on the size of screen. Used bootstrap for this and bunch of ~~nasty css tricks~~.

### Issues
You might encounter some bugs because I haven't slept yet. Here are the ones I noticed, but shouldn't affect your flushing that much.
1. **Result Summary**. I had a little problem with displaying the thumbnails of the result of the roll. The one I did with the card didn't work, so I tried another way but the responsive function was affected. The thumbnails, now showing, doesn't adapt to all screen sizes unlike the cards. Inserted a temporary fix for the following screen sizes.
- Galaxy S5 (360x640)
- Pixel 2 (411x731)
- iPhone 5/SE (320x568)
- iPhone 6/7/8 (375x667)
- iPhone 6/7/8 Plus (414/736)
- iPhone X (375x812)
- iPad (768x1024)

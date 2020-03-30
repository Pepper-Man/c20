---
title: Weapon
template: tag
---

## Firing rates
Firing rates in the old games are fucked due to the low precision of 30hz.

For player firing rate (AI don't respect the weapon tunings, they have their own overrides, which scale by difficulty). There's one or two timers in the weapon code that basically have to track a 'leftover/overflow' time (fire recovery time and locked recover time IIRC).
Take for instance a firing recover time of 0.25s. So, (30hz * 0.25s) = 7.5hz. Every 7.5 ticks, you can fire. But there are no half ticks, so 0.5 must be added to the 'overflow' counter. Once that goes over 1.0 it then waits an additional tick. So every other shot you have an additional tick you have to wait before you shoot. This is okay-ish for 0.25 (IIRC, it was the needler rifle), but for a weapon like the DMR which IIRC had a time of 0.33s, that's 9.9hz per shot. That's going to lead to uneven overflow counters with compounding interest, so to speak, the longer you have that specific weapon (or pick up someone else's weapon). So, in 30hz fire fights you're actually experiencing what amounts to a crap shoot because your overflow timer won't match someone else's, especially if that person just spawned or picked up a DMR that's never been used. You could loose a fire fight because you couldn't fire in the same exact cadence as the opponent.
[14:40] BioGoji1989: After all, it does have an effect on things.  For instance, how quickly trigger pulls are registered (although this is mostly noticeable with AI in the campaign) and how quickly the game processes those things.
[14:40] R93_Sniper:
There may be some finer details that I'm excluding from this, but I don't really have the time to breakdown the entire state machine of the weapon code. But, for 60hz game times, (60hz * 0.25s) = 15hz. That means you can fire cleanly every 15 ticks, no surprise additional tick every so often. This is a more consistent firing experience.

Now, AI have their own weapon 'accuracy' tunings that scale by difficulty. Easy/Normal, Hard, Legendary. The 'accuracy' modifier impacts multiple aspects, including the firing rate. And there are time modifiers for each difficulty that control how long it takes to go from the min accuracy to the max accuracy. Legendary basically goes to 1.0 really fast.
Meanwhile on normal, it may take a long ramp up to hit the max accuracy of say 0.6 (numbers are vague recolections of the jackal's plasma pistol settings, which on legendary tops out at 11 shots per second when burst firing). The problem at 30hz is that there's yet another place where you have precision issues and need to account for not having enough ticks to simulate all the shots the designer tuned the character for. So, the AI fired just as fast back in the day. But, it's not as easy to see because they end up firing two shots in one frame every so often (leftover calculations).
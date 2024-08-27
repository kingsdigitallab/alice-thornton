---
title: "From Bloodletting to Emojis: Exploring Alice Thornton's World Through Computational Text Analytics"
feature: /assets/img/posts/bea_picture_one.jpg
authors:
  - balex
status: draft
tags:
  - TEI
  - data visualisation

---

<p>&nbsp;</p>

*Dr Beatrice Alex is Senior Lecturer and Chancellor’s Fellow at The School of Literatures, Languages and Cultures and the Edinburgh Futures Institute*
 
Alice Thornton, a seventeenth-century Yorkshire gentlewoman, left behind a remarkable legacy through her autobiographical writings. Her manuscripts offer an intimate glimpse into her life, relationships, and the societal norms of her time. Thanks to the diligent efforts of the Alice Thornton Books project team, her four digitised, marked-up and modernised books will soon be accessible for scholarly exploration. This treasure trove presents an exciting opportunity for analysis, particularly for researchers and students in history and literature.  

A few months ago, I was fortunate to be granted advanced access to the digitised text underlying this project.  I am using Thornton’s manuscripts as an example of a real literary dataset in a new course, 'Cultural and Literary Text Analytics', designed to introduce students to digital humanities and natural language processing techniques and tools.  I created Python notebooks to analyse Thornton's writings with the aim of teaching students how to search a collection of texts and their contexts, label it with names of people and places and analyse their relationships. The outcomes of these analyses and the valuable marked up information made available by the project team are visualised for deeper interpretation, unveiling Thornton's personal network, her topics and events covered across all four books, and even her use of unique symbols like the heart emoji, a fascinating exploration considering [Thornton was an early user of this symbol](https://thornton.kdl.kcl.ac.uk/posts/blog/2023-02-13-AliceThorntonsHeart-Blog/) in a prose text. 
 
<p>&nbsp;</p>

## Uncovering the Hidden Gems in Alice Thornton's Books

One of the goals of the text analysis taught in the course is to explore how often and in what context certain names of people and places appear across Alice Thornton’s four books, which have been [meticulously marked up](https://thornton.kdl.kcl.ac.uk/posts/blog/2022-08-25-encoding-alice-thorntons-books/) and disambiguated by the project team. This analysis is crucial in understanding the prominence of individuals in her life and their influence on her narrative. A particularly interesting finding was the frequent mentions of Dr Wittie, her private physician, in *Book of Remembrances* and *Book One* (see Figure 1a). While the project team was already aware of Dr Wittie’s significance in some of Thornton's writing, the text analysis enables a deeper exploration into the contexts in which she mentioned him (see Figure 1b).

![A word cloud showing the frequency of mentions of Dr Wittie in Thornton's books]( {{ "/assets/img/posts/bea_picture_one.jpg" | url }} "Figure 1a. Word cloud, showing the frequency of mentions of Dr Wittie in Thornton's books along with other people")

![Contexts in which Wittie and his practices are mentioned in Thornton's books]( {{ "/assets/img/posts/bea_picture_oneb.jpg" | url }} "Figure 1b. The context in which Wittie and his practices are mentioned in Thornton's books")

When examining these references, it became evident that Dr Wittie was more than just a recurring character in Thornton's life. The analysis revealed that he promoted the prescription of drinking mineral water and was an advocate of bloodletting, a common medical practice at the time. By exploring the concordances of his name, the context his name was used in, we can trace how often and in what situations Thornton discussed his practices and their implications for her health and well-being.

<p>&nbsp;</p>


## Exploring Relationships Through Networks

Beyond individual mentions, the text analysis also allows us to examine relationships between different people and places in Thornton’s life. By visualising who was mentioned in the same context, we can map Thornton’s social network (see Figure 2). This method highlights how her relationships influenced her narrative and shaped the themes of her writing.

For instance, by examining the frequency and context in which certain names appeared together, we identified key figures in her life who were often linked in her storytelling. This included family members, close friends, and significant acquaintances, providing insight into the social dynamics at play in her writing. Such visualisations not only help to better understand Thornton’s personal life but also offer a broader view of the societal norms and connections of the seventeenth century.

![Figure 2.]( {{ "/assets/img/posts/bea_picture_two.jpg" | url }} "Figure 2 presents an excerpt of the network relationship map showcasing the interconnections between Dr Wittie and other figures mentioned in Thornton's *Book of Remembrances*.")

This network analysis, combined with context analysis, also revealed important insights not just in the presence of names but also in their absence. For example, Thornton mentions her mother frequently in all her writing, yet by name only six times.  This suggests that she may have had a close bond to her mother as their relationship was understood without the need for explicit naming. 
 
<p>&nbsp;</p>

## The Cultural Significance of the Heart Emoji

One particularly intriguing discovery in this analysis was Alice Thornton's use of the heart emoji. While emojis are widely considered to be a modern form of expression, Thornton’s use of a heart symbol stands as an early recorded instance in history. This analysis not only identified the occurrences of the heart emoji in context but also explored the emotional and thematic significance it carried in her writing (see Figure 3). By analysing these instances, students can observe how Thornton used the symbol to convey affection, emotion and sentimentality.

![Figure 3.]( {{ "/assets/img/posts/bea_picture_three.jpg" | url }} "Figure 3 shows the concordance analysis of the heart emoji used in Thornton’s works.")


<p>&nbsp;</p>

## Conclusion: A New Lens on Historical Texts

The text analysis of Alice Thornton's writings has provided a fascinating glimpse into her life and times. It highlights the value of digital humanities in enriching our existing knowledge and deepening our appreciation for historical texts and the present. For students and scholars alike, this work demonstrates how the marriage of technology and literature can open up ways of understanding data and text.

The discoveries underscore the value of computational text analysis in uncovering details that might otherwise go unnoticed. Through techniques like concordance analysis, tagging and network analysis, we can gain a deeper understanding of not just the content of historical literary texts but also the emotional and cultural undercurrents that run through them.

Importantly, while parts of Alice Thornton's books can already be accessed on the project website, their digitised and marked-up versions stored in TEI format will become available for further research at the end of the project, offering a valuable resource for anyone interested in early modern history, literature, and cultural studies. My 'Cultural and Literary Text Analytics' course is just one example of how this data can be used for exploration and discovery. Whether you’re an academic, a student, or an independent researcher, these texts provide a rich foundation for uncovering new stories, perspectives and connections in historical literature.


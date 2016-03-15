# project3
3rd Project for WDI-GA-NYC


Welcome to e-Notary
Make Custom Legally Binding Contracts Online

e-Notary is a platform for connecting two parties who wish to create a legally binding contract between themselves. The user who wishes to create a contract(heretofore known as "the Originator") creates an e-Notary account and a user profile. The profile page contains button that allows users to create a customized contract with the click of a button.

Contract Creation:

When a user presses "Create New Contract" a form is generated that allows the originator to input the terms of his contract. The terms of the contract are then transferred onto a Docusign contract. At this point, the user has the option to view his newly created contract. He can download his contract or print his contract. Most importantly, he can press "Send Contract" and email a notification inviting his Counterparty to view the contract.

Notification:

The Counterparty (aka the Recipient) receives an email notifying him that he has been invited to sign a contract created by the Originator. The Recipient can then click on a link in his email that will take him to the e-Notary site where he can view a preview of the contract. In order to view the full contract, he can click "Sign Up" or "Sign In" Upon logging in to e-Notary he can view the contract and execute electronic signatures as provided for by the Docusign api. Generally, a user must both sign at the end of the contract and initial specified areas. The user is shown the exact locations in which they must give their electronic signature by the Docusign Api.

Contract Storage:

When the Counterparty has completed signing the form he presses "finished" and is redirected back to this profile page. At this point, an email notification is sent to the Originator that the contract has been signed.  On the profile page of both parties the contract is now displayed in the "My Contracts" section. A user has access to his contract anytime that that he is logged into his profile page. As users accumulate more contracts they will also be added to the "My Contracts" section of the Profile Page.

Additional Features:

In the future, users will be able to invite third parties to view specific contracts. In this way, the site will allow users to use the site as a base from which they can share, send, and store their contracts.

Users may also be able to rate the degree to which their Counterparties honored their contracts, thus creating a "Reputation Rating" that will be visible to future people with whom the user seeks to initiate contracts.  

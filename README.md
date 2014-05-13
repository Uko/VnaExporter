VnaExporter for Pharo [![Build Status](https://travis-ci.org/Uko/VnaExporter.svg?branch=master)](https://travis-ci.org/Uko/VnaExporter)
=====================

Short description about VNA format can be found on [Gephi website](https://gephi.org/users/supported-graph-formats/netdraw-vna-format/).

Installation
------------

VnaExporter is available in Pharo 3 configuration browser.

You can also load it executing is a workspace:

    Gofer it
      smalltalkhubUser: 'Pharo'
      project: 'MetaRepoForPharo30';
      configurationOf: 'VnaExporter';
      loadStable.

How to use
----------

###Setup

First create a new instance of exporter: `exporter := VnaExporter new`.

To add nodes use:

    exporter addNode: anObject.
    exporter addNodes: aCollection.
    exporter model: aCollection "overrides whole nodes set"

To add edges use:

    exporter addEdge: aPair.
    exporter addEdges: aCollectionOfPairs.
    exporter edges: aCollectionOfPairs "overrides whole edges set"

There are also shortcuts for edges:

    exporter connectAll "intializes all possible edges".
    exporter connectAllNoLoops "intializes all possible edges except loops".
    exporter connectAllUndirected "for any 2 nodes only one edge is initialised between them".
    exporter connectAllUndirectedNoLoops "Same as previous but without loops"

###Data and properties

To define different properties we use blocks. They will be evaluated for each node to obtain required data.

Remember to initialise the `idBlock`, the default value is `#yourself`. Remember that specification says that _ID_ has to be unique.

    exporter idBlock: aBlock "block accepts 1 value"

To set a _node data_ values use:

    exporter nodeData: #dataName computeAs: aBlock

you can also remove them with:

    exporter removeNodeData: #dataName

Each node property has the dedicated getter and setter. If there is no block set (_i.e._ value is set to `nil`) that property won't be exported (blocks accepts 1 value).

    exporter xBlock: aBlock.
    exporter yBlock: aBlock.
    exporter sizeBlock: aBlock.
    ...

Edges data has a similar API as node data, but block have to accept **2** values.

    exporter tieData: #dataName computeAs: aBlock.
    exporter removeTieData: #dataName

To generate VNA from the exporter either print it on a stream or generate a string:

    exporter printOn: aStream.
    exporter printString

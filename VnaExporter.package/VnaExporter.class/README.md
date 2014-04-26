I export data in VNA graph format.

Usage guide: https://github.com/Uko/VnaExporter#vnaexporter-for-pharo

Report issues at: https://github.com/Uko/VnaExporter/issues

##Short usage guide:

Add nodes using #addNode: or #addNodes:, add edges using #addEdge: or #addEdges: (edge should ge an association "form -> to").

Add data with #nodeData:computeAs:, edge data with #tideData:ComputeAs:. (a block will be evaluated for each node or pair of nodes in case of edges).
Add node properties with #<prop>Block:. Defaults are nil, default for idBlock is #yourself.

Export data as VNA with #printString or #printOn:
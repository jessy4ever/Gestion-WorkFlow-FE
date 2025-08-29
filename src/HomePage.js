import { useState } from "react";
import { Tree, Drawer } from "antd";
import { FolderOutlined, FileOutlined } from "@ant-design/icons";
import "./HomePage.css";

// Example workflow data
const workflowData = [
  {
    title: "Mes workflows",
    key: "0",
    icon: <FolderOutlined />,
    children: [
      { title: "Workflow A", key: "0-0", icon: <FileOutlined /> },
      { title: "Workflow B", key: "0-1", icon: <FileOutlined /> },
    ],
  },
  {
    title: "Workflows partagés",
    key: "1",
    icon: <FolderOutlined />,
    children: [
      { title: "Workflow X", key: "1-0", icon: <FileOutlined /> },
      { title: "Workflow Y", key: "1-1", icon: <FileOutlined /> },
    ],
  },
];

// Map keys to workflow details (for demo)
const workflowDetails = {
  "0-0": { name: "Workflow A", image: "/flowchart1.png" },
  "0-1": { name: "Workflow B", image: "/flowchart2.png" },
  "1-0": { name: "Workflow X", image: "/flowchart1.png" },
  "1-1": { name: "Workflow Y", image: "/flowchart2.png" },
};

function WorkflowHeader({ workflow, onEdit, onDelete, onShare }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-blue-700">{workflow.name}</h2>
      <div className="flex gap-2">
        <button onClick={onEdit} className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
          Éditer
        </button>
        <button onClick={onDelete} className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
          Supprimer
        </button>
        <button onClick={onShare} className="px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
          Partager
        </button>
      </div>
    </div>
  );
}

function WorkflowCanvas({ workflow }) {
  // Replace with React Flow or iframe if needed
  return (
    <div className="flex-1 bg-gray-50 rounded-lg shadow-inner flex items-center justify-center">
      <img
        src={workflow.image}
        alt={workflow.name}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}

function WorkflowFooter({ workflow }) {
  return (
    <div className="text-sm text-gray-500 mt-2">
      <div>Créé par : -</div>
      <div>Dernière modification : -</div>
    </div>
  );
}

function HomePage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Handle tree node selection
  const onSelect = (selectedKeys, info) => {
    const key = selectedKeys[0];
    // Only select leaf nodes (workflows)
    if (info.node.children === undefined && workflowDetails[key]) {
      setSelectedWorkflow(workflowDetails[key]);
      setShowDetails(true); // Open drawer when workflow selected
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar gauche */}
      <div className="sidebar-left">
        <h3>Menu</h3>
        <Tree
          showIcon
          treeData={workflowData}
          defaultExpandAll
          onSelect={onSelect}
          style={{ marginBottom: 24 }}
        />
      </div>

      {/* Main part */}
      <div className="flex flex-col flex-1 p-4 main-section">
        {!selectedWorkflow ? (
          <div className="flex-1 flex items-center justify-center text-blue-700 text-2xl font-semibold">
            Sélectionner une fonction
          </div>
        ) : (
          <>
            <WorkflowHeader
              workflow={selectedWorkflow}
              onEdit={() => alert("Edit")}
              onDelete={() => alert("Delete")}
              onShare={() => alert("Share")}
            />
            <WorkflowCanvas workflow={selectedWorkflow} />
            <WorkflowFooter workflow={selectedWorkflow} />
          </>
        )}
      </div>

      {/* Drawer for details */}
      <Drawer
        title="Détails"
        placement="right"
        onClose={() => setShowDetails(false)}
        open={showDetails}
        width={350}
        destroyOnClose
      >
        {selectedWorkflow && (
          <>
            <div className="preview-card" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <img
                src={selectedWorkflow.image}
                alt={selectedWorkflow.name}
                style={{
                  width: 48,
                  height: 48,
                  objectFit: "cover",
                  borderRadius: 4,
                  border: "1px solid #eee"
                }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>{selectedWorkflow.name}</div>
                <div style={{ fontSize: 12, color: "#888" }}>Type: PDF</div>
              </div>
            </div>
            <div className="info-box">
              <strong>Informations de base :</strong>
              <div style={{ marginTop: 10 }}>
                <div style={{ marginBottom: 8 }}><strong>Nom :</strong> {selectedWorkflow.name}</div>
                <div style={{ marginBottom: 8 }}><strong>Propriétaire :</strong> -</div>
                <div style={{ marginBottom: 8 }}><strong>Créé le :</strong> -</div>
                <div style={{ marginBottom: 8 }}><strong>Mis à jour le :</strong> -</div>
                <div style={{ marginBottom: 8 }}><strong>Taille :</strong> -</div>
                <div style={{ marginBottom: 8 }}><strong>Type :</strong> PDF</div>
              </div>
            </div>
            {/* Add actions here if needed */}
          </>
        )}
      </Drawer>
    </div>
  );
}

export default HomePage;
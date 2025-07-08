export interface PedigreeNode {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  description: string;
  age: string;
  color: string;
  status: string;
  price: string;
  gallery: string[];
  gender: 'male' | 'female';
  birthDate: string;
  registrationNumber?: string;
  motherId?: string;
  fatherId?: string;
  generation: number;
  position: {
    x: number;
    y: number;
  };
}

export interface PedigreeConnection {
  id: string;
  parentId: string;
  childId: string;
  type: 'mother' | 'father';
}

export interface PedigreeTree {
  id: string;
  rootCatId: string;
  nodes: PedigreeNode[];
  connections: PedigreeConnection[];
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CatWithPedigree extends PedigreeNode {
  pedigreeId?: string;
  hasFullPedigree: boolean;
  generationCount: number;
}

export interface DragItem {
  id: string;
  type: 'cat';
  cat: PedigreeNode;
}

export interface AdminState {
  isAuthenticated: boolean;
  selectedCat: PedigreeNode | null;
  selectedPedigree: PedigreeTree | null;
  draggedItem: DragItem | null;
  isEditing: boolean;
}
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';

export default {
  setup() {
    const productos = ref([
      { id: 1, codigo: 'PRD-001', nombre: 'Teclado', categoria: 'Electrónica', cantidad: 10, valor: 'Caracas'},
      { id: 2, codigo: 'PRD-002', nombre: 'Mouse', categoria: 'Electrónica', cantidad: 10, valor: 'Caracas'},
    ]);

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      codigo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
      categoria: { value: null, matchMode: FilterMatchMode.CONTAINS },
      cantidad: { value: null, matchMode: FilterMatchMode.EQUALS  },
      valor: { value: null, matchMode: FilterMatchMode.CONTAINS  }
    });

    // Configuración de paginación en español
    const paginatorConfig = {
      paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport',
      rowsPerPageOptions: [5, 10, 20],
      currentPageReportTemplate: 'Mostrando {first} a {last} de {totalRecords} registros',
      firstPageLabel: 'Primera página',
      prevPageLabel: 'Página anterior',
      nextPageLabel: 'Página siguiente',
      lastPageLabel: 'Última página',
      rowsPerPageLabel: 'Filas por página:'
    };

    return { productos, filters, paginatorConfig };
  }
}
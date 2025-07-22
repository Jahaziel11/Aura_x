import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import axios from 'axios';
import { useSessionStore } from '@/store/sessionStore'

export default {
  setup() {
    /*const productos = ref([
      { id: 1, codigo: 'PRD-001', nombre: 'Teclado', categoria: 'Electrónica', cantidad: 10, valor: 'Caracas'},
      { id: 2, codigo: 'PRD-002', nombre: 'Mouse', categoria: 'Electrónica', cantidad: 10, valor: 'Caracas'},
    ]);

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      codigo: { value: null, matchMode: FilterMatchMode.CONTAINS },
      nombre: { value: null, matchMode: FilterMatchMode.CONTAINS },
      categoria: { value: null, matchMode: FilterMatchMode.CONTAINS },
      cantidad: { value: null, matchMode: FilterMatchMode.CONTAINS  },
      valor: { value: null, matchMode: FilterMatchMode.CONTAINS  }
    });*/
    onMounted(async () => {
      await cargar_macroprocesos();
    });

    const ip = import.meta.env.VITE_API_URL;
    const columnas = ref([]);
     const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const productos = ref([]);
    const sessionStore = useSessionStore()


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

    const cargar_macroprocesos = async () => {
      try {
        const response = await axios.get(ip + '/macroprocesos', {
          params: {
            sesion_id: sessionStore.sesion_id,
            acc: 1
          }
        });

        const data = response.data?.data;

        if (Array.isArray(data) && data.length > 0) {
          // Extraer columnas automáticamente
          columnas.value = Object.keys(data[0]).map((key) => {
            const campo = key.toLowerCase(); // para estandarizar
            filters.value[campo] = { value: null, matchMode: FilterMatchMode.CONTAINS };
            return { field: campo, header: key }; // key conserva el capital original (Descripción, etc.)
          });

          // Asignar los datos
          productos.value = data;
        }

      } catch (error) {
        console.error('Error al cargar macroprocesos:', error);
      }
    };

    const limpiarFiltros = () => {
      Object.keys(filters.value).forEach(key => {
        filters.value[key].value = null;
      });
    };



    return { productos, filters, paginatorConfig,columnas,limpiarFiltros };
  }
}
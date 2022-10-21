using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace client.ViewModels
{
    public class DoughnutChartVM
    {
        public IEnumerable<string> LabelName { get; set; }
        public IEnumerable<int> NumberCards { get; set; }
    }
}
